import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      {/* Left Side */}
      <div className="container hero-container">
      <div className="hero-content">

        <p className="hero-tag">
          🚀 Custom Web Design Services
        </p>

        <h1>
          Custom Websites That Help
          <span> Your Business Grow</span>
        </h1>

        <p className="hero-description">
          From idea to launch, we create fast,
          responsive and customer-focused websites
          for startups, freelancers and small businesses.
        </p>

        <div className="hero-features">

          <span>✔ Mobile First</span>

          <span>✔ SEO Ready</span>

          <span>✔ Ongoing Support</span>

        </div>

        <div className="hero-buttons">

          <Link
            to="/plan-website"
            className="primary-btn"
          >
            Plan My Website
          </Link>

          <Link
            to="/portfolio"
            className="secondary-btn"
          >
            View Portfolio
          </Link>

        </div>

      </div>

      {/* Right Side */}

      <div className="hero-image">

        <div>
    Website Illustration
    <br />
    Coming Soon
  </div>

      </div>
</div>
    </section>
  );
}

export default Hero;