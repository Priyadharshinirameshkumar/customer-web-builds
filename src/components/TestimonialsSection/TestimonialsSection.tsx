import "./TestimonialsSection.css";

import SectionHeader from "../SectionHeader/SectionHeader";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { testimonials } from "../../data/testimonials";

function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">

        <SectionHeader
          title="What Our Clients Say"
          description="Hear from businesses that trusted us to build their websites."
        />

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