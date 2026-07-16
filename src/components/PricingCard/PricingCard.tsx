import "./PricingCard.css";
import { FaCheck } from "react-icons/fa";

interface PricingCardProps {
  plan: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

function PricingCard({
  plan,
  price,
  description,
  features,
  popular,
}: PricingCardProps) {
  return (
    <div className={`pricing-card ${popular ? "popular" : ""}`}>
      {popular && (
        <div className="popular-badge">
          Most Popular
        </div>
      )}

      <h3>{plan}</h3>

      <h2>{price}</h2>

      <p>{description}</p>

      <ul className="pricing-features">
        {features.map((feature, index) => (
          <li key={index}>
            <FaCheck className="check-icon" />
            {feature}
          </li>
        ))}
      </ul>

      <button className="pricing-button">
        Choose Plan
      </button>
    </div>
  );
}

export default PricingCard;