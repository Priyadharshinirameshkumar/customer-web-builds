import api from "../api/api";

export interface WebsitePlanData {
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

export const createWebsitePlan = async (
  data: WebsitePlanData
) => {
  const response = await api.post("/website-plan", data);
  return response.data;
};