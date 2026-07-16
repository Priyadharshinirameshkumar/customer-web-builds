import client1 from "../assets/images/testimonials/client1.png";
import client2 from "../assets/images/testimonials/client2.png";
import client3 from "../assets/images/testimonials/client3.png";

import { type Testimonial } from "../types/testimonials";
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "ABC Restaurant",
    review:
      "The team created a beautiful restaurant website that perfectly represents our brand. Highly recommended!",
    rating: 5,
    image: client1,
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    company: "HealthCare Clinic",
    review:
      "Our appointment booking process became much easier after launching the new website.",
    rating: 5,
    image: client2,
  },
  {
    id: 3,
    name: "Emily Carter",
    company: "Style Store",
    review:
      "The online store is fast, responsive and has helped us reach more customers.",
    rating: 5,
    image: client3,
  },
];