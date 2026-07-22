import "./TestimonialsSection.css";

import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { testimonials } from "../../data/testimonials";

function TestimonialsSection() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">

        <h2 className="section-title">
          What Our Clients Say
        </h2>

        <p className="section-description">
          Hear from businesses that trusted us to build their websites.
        </p>

        <div className="testimonials-grid">

          {testimonials.map((testimonial) => (

            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              company={testimonial.company}
              review={testimonial.review}
              rating={testimonial.rating}
              image={testimonial.image}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;