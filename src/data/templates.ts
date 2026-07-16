import restaurantTemplate from "../assets/images/templates/restaurant-template.png";
import clinicTemplate from "../assets/images/templates/clinic-template.png";
import ecommerceTemplate from "../assets/images/templates/ecommerce-template.png";
import educationTemplate from "../assets/images/templates/education-template.png";

import { type WebsiteTemplate } from "../types/template";

export const templates: WebsiteTemplate[] = [
  {
    id: 1,
    title: "Restaurant Website",
    category: "Restaurant",
    description:
      "Perfect for restaurants, cafés and food businesses.",
    image: restaurantTemplate,
    previewLink: "#",
  },
  {
    id: 2,
    title: "Clinic Website",
    category: "Healthcare",
    description:
      "Appointment booking and healthcare information.",
    image: clinicTemplate,
    previewLink: "#",
  },
  {
    id: 3,
    title: "E-Commerce Store",
    category: "Shopping",
    description:
      "Modern online shopping website with product catalog.",
    image: ecommerceTemplate,
    previewLink: "#",
  },
  {
    id: 4,
    title: "Education Website",
    category: "Education",
    description:
      "Perfect for schools, colleges and online courses.",
    image: educationTemplate,
    previewLink: "#",
  },
  
];