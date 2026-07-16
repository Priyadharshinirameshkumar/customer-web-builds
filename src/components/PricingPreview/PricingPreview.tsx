import "./PricingPreview.css";

import PricingCard from "../PricingCard/PricingCard";
import { pricingPlans } from "../../data/pricingPlans";

function PricingPreview() {
  return (
    <section className="pricing-preview">
      <div className="container">

        <h2 className="section-title">
          Simple & Transparent Pricing
        </h2>

        <p className="section-description">
          Choose the plan that best fits your business needs.
          Need something custom? We'll tailor a solution for you.
        </p>

        <div className="pricing-grid">

          {pricingPlans.map((plan) => (

            <PricingCard
              key={plan.id}
              plan={plan.plan}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default PricingPreview;