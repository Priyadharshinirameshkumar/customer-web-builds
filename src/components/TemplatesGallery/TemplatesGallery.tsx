import "./TemplatesGallery.css";

import TemplateCard from "../TemplateCard/TemplateCard";
import { templates } from "../../data/templates";

function TemplatesGallery() {
  return (
    <section id="templates" className="templates-gallery">
      <div className="container">

        <h2 className="section-title">
          Website Templates
        </h2>

        <p className="section-description">
          Browse our ready-made website layouts. Every template can be fully customized to match your business needs.
        </p>

        <div className="templates-grid">

          {templates.map((template) => (

            <TemplateCard
              key={template.id}
              title={template.title}
              category={template.category}
              description={template.description}
              image={template.image}
              previewLink={template.previewLink}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default TemplatesGallery;