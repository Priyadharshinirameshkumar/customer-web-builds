import { useNavigate } from "react-router-dom";
import "./CTA.css";

function CTA() {
    const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Build Your Dream Website?</h2>

        <p>
          Let's transform your ideas into a modern, responsive, and
          customer-focused website that helps your business grow.
        </p>

        <div className="cta-buttons">
          <button
    className="primary-btn"
    onClick={() => navigate("/plan-website")}
>
    Plan My Website
</button>

          <button
    className="secondary-btn"
    onClick={() => navigate("/plan-website")}
>
    Book Discovery Call
</button>
        </div>
      </div>
    </section>
  );
}

export default CTA;