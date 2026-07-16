import "./WhyChooseUs.css";
import { whyChooseUsData } from "../../data/whyChooseUs";

function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>

        <p className="section-description">
          We build websites that are modern, responsive, and designed to help
          your business grow online.
        </p>

        <div className="why-choose-grid">
          {whyChooseUsData.map((item) => (
            <div className="why-card" key={item.id}>
            <div className="why-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;