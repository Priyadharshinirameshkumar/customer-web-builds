import "./SectionHeader.css";

interface SectionHeaderProps {
  title: string;
  description: string;
}

function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-title">
        {title}
      </h2>

      <p className="section-description">
        {description}
      </p>
    </div>
  );
}

export default SectionHeader;