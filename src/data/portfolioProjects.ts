
import restaurantImage from "../assets/images/portfolio/restaurant.png";
import clinicImage from "../assets/images/portfolio/clinic.png";
import ecommerceImage from "../assets/images/portfolio/ecommerce.png";

import { type PortfolioProject } from "../types/portfolioProject";
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Restaurant Website",
    description:
      "A modern restaurant website with menu, reservations and contact form.",
    technologies: ["React",
"TypeScript",
"Responsive Design"],
    image: restaurantImage,
    liveLink: "https://shreeanandhaas.com/",
  },
  {
    id: 2,
    title: "Clinic Website",
    description:
      "Healthcare website with appointment booking and patient enquiry form.",
    technologies: ["Appointment Booking", "Responsive", "SEO"],
    image: clinicImage,
    liveLink: "https://www.apolloclinic.com/",
  },
  {
    id: 3,
    title: "E-Commerce Store",
    description:
      "Online shopping website with product listings and secure checkout.",
    technologies: ["Shopping Cart", "Payments", "Responsive"],
    image: ecommerceImage,
    liveLink: "https://www.nykaa.com/",
  },
];