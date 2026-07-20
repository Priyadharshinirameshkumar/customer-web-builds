import { z } from "zod";

export const websitePlanSchema = z.object({
  fullName: z.string().min(3),

  businessName: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(10),

  websiteSize: z.string(),

  businessType: z.string(),

  targetAudience: z.string().optional(),

  features: z.string().optional(),

  hosting: z.string().optional(),

  maintenance: z.string().optional(),

  seoRequirement: z.string().optional(),

  additionalRequirements: z.string().optional()
});