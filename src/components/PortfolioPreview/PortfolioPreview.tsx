import "./PortfolioPreview.css";

import PortfolioCard from "../PortfolioCard/PortfolioCard";
import { portfolioProjects } from "../../data/portfolioProjects";
import SectionHeader from "../SectionHeader/SectionHeader";
function PortfolioPreview() {
  return (
    <section id="portfolio" className="portfolio-preview">
      <div className="container">

        <SectionHeader
    title="Our Recent Projects"
    description="Explore some example websites that showcase the quality and features we can build for your business."
/>
        <div className="portfolio-grid">

          {portfolioProjects.map((project) => (

            <PortfolioCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              liveLink={project.liveLink}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default PortfolioPreview;