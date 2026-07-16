import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Customer Web Builds
      </div>

      <ul className="navbar-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/templates">Templates</NavLink>
        </li>

        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>

        <li>
          <NavLink to="/portfolio">Portfolio</NavLink>
        </li>

        <li>
          <NavLink to="/reviews">Reviews</NavLink>
        </li>

      </ul>

      <button className="navbar-button">
        Plan My Website
      </button>

    </nav>
  );
}

export default Navbar;