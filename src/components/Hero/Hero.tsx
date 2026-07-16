import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Build Your Dream Website
          <span> Without the Technical Headache</span>
        </h1>

        <p>
          We design and develop modern, responsive websites
          for startups, small businesses and entrepreneurs.
          From idea to launch, we help you every step of the way.
        </p>

        <div className="hero-buttons">

          <Link to="/plan-website" className="primary-btn">
            Plan My Website
          </Link>

          <Link to="/portfolio" className="secondary-btn">
            View Portfolio
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://placehold.co/500x400"
          alt="Website Illustration"
        />

      </div>

    </section>
  );
}

export default Hero;