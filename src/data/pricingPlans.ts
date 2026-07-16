import { type PricingPlan } from "../types/pricingPlan";

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    plan: "Starter",
    price: "₹9,999",
    description: "Perfect for startups and personal websites.",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "1 Month Support"
    ],
    popular: false
  },
  {
    id: 2,
    plan: "Pro",
    price: "₹19,999",
    description: "Ideal for growing businesses.",
    features: [
      "Up to 10 Pages",
      "Appointment Booking",
      "WhatsApp Integration",
      "Advanced SEO",
      "Email Automation",
      "3 Months Support"
    ],
    popular: true
  },
  {
    id: 3,
    plan: "Growth",
    price: "₹39,999",
    description: "Complete solution for scaling businesses.",
    features: [
      "Unlimited Pages",
      "E-Commerce Store",
      "Payment Gateway",
      "Admin Dashboard",
      "Premium SEO",
      "6 Months Support"
    ],
    popular: false
  }
];