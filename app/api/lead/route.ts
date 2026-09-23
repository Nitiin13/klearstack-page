import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/lead-schema";

// Simple in-memory rate limiter per IP (max 5 requests per 60 seconds)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}

// HubSpot Contact Creation
async function createHubSpotContact(data: any) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.log("[HubSpot] Token missing, skipping live API call.");
    return { status: "skipped", reason: "HUBSPOT_ACCESS_TOKEN not configured" };
  }

  const [firstName, ...lastNameParts] = data.fullName.trim().split(" ");
  const lastName = lastNameParts.join(" ") || "N/A";

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        email: data.businessEmail,
        firstname: firstName,
        lastname: lastName,
        company: data.companyName,
        phone: `${data.countryCode}${data.phoneNumber}`,
        jobtitle: data.jobTitle,
        message: `Volume: ${data.monthlyVolume} | DocTypes: ${data.docTypes?.join(", ")} | Use Case: ${data.useCase || "N/A"}`,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HubSpot API Error ${res.status}: ${errText}`);
  }

  return await res.json();
}

// Google Sheets Apps Script Web App append
async function appendToGoogleSheet(data: any) {
  const url = process.env.SHEETS_WEBAPP_URL;
  if (!url) {
    console.log("[Google Sheets] Web App URL missing, skipping live WebApp post.");
    return { status: "skipped", reason: "SHEETS_WEBAPP_URL not configured" };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    fullName: data.fullName,
    businessEmail: data.businessEmail,
    companyName: data.companyName,
    phone: `${data.countryCode} ${data.phoneNumber}`,
    jobTitle: data.jobTitle,
    monthlyVolume: data.monthlyVolume,
    docTypes: data.docTypes?.join(", "),
    useCase: data.useCase || "",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Google Sheets WebApp Error ${res.status}`);
  }

  return { status: "success" };
}

// Resend Email Notification
async function sendNotificationEmail(data: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_TO_EMAIL || "ai-labs@hexanovate.com";

  if (!apiKey) {
    console.log("[Resend Email] API key missing, skipping email delivery.");
    return { status: "skipped", reason: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "KlearStack Leads <onboarding@resend.dev>",
      to: [toEmail],
      subject: `⚡ New High-Intent Lead: ${data.companyName} (${data.fullName})`,
      html: `
        <h2>New KlearStack Demo Request</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.businessEmail}</p>
        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Phone:</strong> ${data.countryCode} ${data.phoneNumber}</p>
        <p><strong>Job Title:</strong> ${data.jobTitle}</p>
        <p><strong>Monthly Volume:</strong> ${data.monthlyVolume}</p>
        <p><strong>Document Types:</strong> ${data.docTypes?.join(", ")}</p>
        <p><strong>Use Case:</strong> ${data.useCase || "N/A"}</p>
        <hr />
        <p><small>Submitted at ${new Date().toLocaleString()}</small></p>
      `,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend Email Error ${res.status}: ${errText}`);
  }

  return await res.json();
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse payload
    const body = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json(
        { error: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // 3. Server-side Zod validation
    const parseResult = leadFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const leadData = parseResult.data;

    // 4. Fan-out integration via Promise.allSettled
    const results = await Promise.allSettled([
      createHubSpotContact(leadData),
      appendToGoogleSheet(leadData),
      sendNotificationEmail(leadData),
    ]);

    const partialFailures: string[] = [];

    const hubspotRes = results[0];
    if (hubspotRes.status === "rejected") {
      console.error("[Fanout Fail] HubSpot CRM:", hubspotRes.reason);
      partialFailures.push("HubSpot CRM sync failed");
    }

    const sheetsRes = results[1];
    if (sheetsRes.status === "rejected") {
      console.error("[Fanout Fail] Google Sheets:", sheetsRes.reason);
      partialFailures.push("Google Sheets logging failed");
    }

    const emailRes = results[2];
    if (emailRes.status === "rejected") {
      console.error("[Fanout Fail] Notification Email:", emailRes.reason);
      partialFailures.push("Email alert dispatch failed");
    }

    return NextResponse.json({
      ok: true,
      message: "Lead received successfully",
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      partialFailures: partialFailures.length > 0 ? partialFailures : undefined,
    });
  } catch (err: any) {
    console.error("[API Error] /api/lead:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your submission." },
      { status: 500 }
    );
  }
}
