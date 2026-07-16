import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../../assets/images/hero/hero-image.png";

function Hero() {
  return (
    <section id="home" className="hero">
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
    <img
        src={heroImage}
        alt="Website Design Illustration"
    />
</div>
</div>
    </section>
  );
}

export default Hero;