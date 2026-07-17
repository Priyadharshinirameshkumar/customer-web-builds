import "./Footer.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h3>Customer Web Builds</h3>
           <p>
        We design and develop modern, responsive,
        and customer-focused websites that help
        businesses establish a strong online presence.
    </p>
        </div>

        <div className="footer-section">

    <h3>Quick Links</h3>

    <ul className="footer-links">

        <li>
            <a href="#home">Home</a>
        </li>

        <li>
            <a href="#templates">Templates</a>
        </li>

        <li>
            <a href="#pricing">Pricing</a>
        </li>

        <li>
            <a href="#portfolio">Portfolio</a>
        </li>

        <li>
            <a href="#reviews">Reviews</a>
        </li>

    </ul>

</div>

        <div className="footer-section">

    <h3>Contact</h3>

    <div className="contact-item">
        <FaEnvelope className="contact-icon" />
        <span>support@customerwebbuilds.com</span>
    </div>

    <div className="contact-item">
        <FaPhoneAlt className="contact-icon" />
        <span>+91 98765 43210</span>
    </div>

    <div className="contact-item">
        <FaMapMarkerAlt className="contact-icon" />
        <span>Coimbatore, Tamil Nadu</span>
    </div>

</div>

        <div className="footer-section">
  <h3>Follow Us</h3>

  <div className="social-links">
    <a
      href="https://www.linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <FaLinkedin />
    </a>

    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <FaGithub />
    </a>

    <a
      href="https://www.instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
  </div>
</div>

      </div>

      <div className="footer-bottom">
  <p>
    © 2026 Customer Web Builds. All Rights Reserved.
  </p>
</div>

    </footer>
  );
}

export default Footer;