import "./TemplateCard.css";

interface TemplateCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  previewLink: string;
}

function TemplateCard({
  title,
  category,
  description,
  image,
  previewLink,
}: TemplateCardProps) {
  return (
    <div className="template-card">

      <div className="template-image">
        <img
          src={image}
          alt={title}
        />

        <span className="template-category">
          {category}
        </span>
      </div>

      <div className="template-content">

        <h3>{title}</h3>

        <p>{description}</p>

        <a
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="template-button"
        >
          Preview Template
        </a>

      </div>

    </div>
  );
}

export default TemplateCard;