import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          Customer Web Builds
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
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

      <button className="navbar-button">
        Plan My Website
      </button>
    </nav>
  );
}

export default Navbar;