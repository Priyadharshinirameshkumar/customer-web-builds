export interface WebsitePlanInput {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;

  websiteSize: string;
  businessType: string;

  targetAudience?: string;

  features?: string;

  hosting?: string;

  maintenance?: string;

  seoRequirement?: string;

  additionalRequirements?: string;
}