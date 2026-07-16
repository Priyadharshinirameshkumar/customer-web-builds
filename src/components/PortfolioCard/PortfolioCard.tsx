import "./PortfolioCard.css";

interface PortfolioCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveLink: string;
}

function PortfolioCard({
  title,
  description,
  technologies,
  image,
  liveLink,
}: PortfolioCardProps) {
  return (
    <div className="portfolio-card">

      <div className="portfolio-image">
        <img
          src={image}
          alt={title}
        />
      </div>

      <div className="portfolio-content">

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="technology-tags">

          {technologies.map((tech, index) => (

            <span
              key={index}
              className="tech-tag"
            >
              {tech}
            </span>

          ))}

        </div>

        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-button"
        >
          Explore Website
        </a>

      </div>

    </div>
  );
}

export default PortfolioCard;