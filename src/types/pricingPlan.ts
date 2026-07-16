export interface PricingPlan {
  id: number;
  plan: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}