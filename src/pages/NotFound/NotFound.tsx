import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;