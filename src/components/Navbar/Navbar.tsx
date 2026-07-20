import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const closeMenu = () => {
  setIsMenuOpen(false);
};
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
    <HashLink smooth to="/#home"
     onClick={closeMenu}>
    Home
</HashLink>
  </li>

  <li>
    <HashLink smooth to="/#templates"  onClick={closeMenu}>
    Templates
</HashLink>
  </li>

  <li>
    <HashLink smooth to="/#pricing"  onClick={closeMenu}>
    Pricing
</HashLink>
  </li>

  <li>
    <HashLink smooth to="/#portfolio"  onClick={closeMenu}>
    Portfolio
</HashLink>
  </li>

  <li>
   <HashLink smooth to="/#reviews"  onClick={closeMenu}>
    Reviews
</HashLink>
  </li>

  <li>
    <NavLink to="/plan-website"  onClick={closeMenu}>
      Plan My Website
    </NavLink>
  </li>
</ul>
      
    </nav>
  );
}

export default Navbar;