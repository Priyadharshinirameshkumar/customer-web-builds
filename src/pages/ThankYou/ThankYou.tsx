import { Link } from "react-router-dom";
import "./ThankYou.css";

function ThankYou() {
  return (
    <section className="thank-you-page">
      <div className="thank-you-card">
        <div className="success-icon">✅</div>

        <h1>Thank You!</h1>

        <p>
          Your discovery call request has been submitted successfully.
        </p>

        <p>
          Our team will review your request and contact you within
          <strong> 24 hours </strong>
          to confirm your meeting.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default ThankYou;