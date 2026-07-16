import "./TestimonialCard.css";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  company: string;
  review: string;
  rating: number;
  image: string;
}

function TestimonialCard({
  name,
  company,
  review,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="testimonial-card">

      <div className="testimonial-stars">
        {[...Array(rating)].map((_, index) => (
          <FaStar
            key={index}
            className="star-icon"
          />
        ))}
      </div>

      <p className="testimonial-review">
        "{review}"
      </p>

      <div className="testimonial-user">

        <img
          src={image}
          alt={name}
        />

        <div>

          <h4>{name}</h4>

          <span>{company}</span>

        </div>

      </div>

    </div>
  );
}

export default TestimonialCard;