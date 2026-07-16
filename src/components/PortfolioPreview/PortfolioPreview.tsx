import "./PortfolioPreview.css";

import PortfolioCard from "../PortfolioCard/PortfolioCard";
import { portfolioProjects } from "../../data/portfolioProjects";

function PortfolioPreview() {
  return (
    <section className="portfolio-preview">
      <div className="container">

        <h2 className="section-title">
          Our Recent Projects
        </h2>

        <p className="section-description">
          Explore some example websites that showcase the
          quality and features we can build for your business.
        </p>

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