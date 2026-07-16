import "./WebsiteFeatures.css";

import FeatureCard from "../FeatureCard/FeatureCard";
import { websiteFeaturesData } from "../../data/websiteFeatures";

function WebsiteFeatures() {
  return (
    <section className="website-features">
      <div className="container">

        <h2 className="section-title">
          Website Features We Can Build
        </h2>

        <p className="section-description">
          Choose the features that best match your business
          needs. We build websites tailored to your goals.
        </p>

        <div className="features-grid">

          {websiteFeaturesData.map((feature) => (

            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default WebsiteFeatures;