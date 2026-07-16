import "./TemplatesGallery.css";

import SectionHeader from "../SectionHeader/SectionHeader";
import TemplateCard from "../TemplateCard/TemplateCard";
import { templates } from "../../data/templates";

function TemplatesGallery() {
  return (
    <section id="templates" className="templates-gallery">
      <div className="container">

        <SectionHeader
          title="Website Templates"
          description="Browse our ready-made website layouts. Every template can be fully customized to match your business needs."
        />

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