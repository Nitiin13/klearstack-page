import { z } from "zod";

export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "rediffmail.com",
  "aol.com",
  "live.com",
  "yandex.com",
  "zoho.com",
];

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name is too long"),
  businessEmail: z
    .string()
    .min(1, "Business email is required")
    .email("Enter a valid email address")
    .refine(
      (val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain ? !FREE_EMAIL_DOMAINS.includes(domain) : false;
      },
      { message: "Please use your work email address (free email providers not accepted)" }
    ),
  companyName: z
    .string()
    .min(2, "Company name is required"),
  countryCode: z.string().default("+91"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[0-9\s\-()+]+$/, "Invalid phone number format"),
  jobTitle: z.string().min(1, "Please select your job title"),
  monthlyVolume: z.string().min(1, "Please select document volume"),
  docTypes: z.array(z.string()).min(1, "Please select at least one document type"),
  useCase: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
