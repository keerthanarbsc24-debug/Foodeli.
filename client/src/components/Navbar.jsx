
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">F</span>
        <span>
          foodeli<span className="brand-dot">.</span>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/menu">
          Menu
        </NavLink>

        <NavLink to="/orders">
          Orders
        </NavLink>

        <NavLink to="/about">
          About & Contact
        </NavLink>
      </div>

      <div className="nav-actions">
        <Link to="/signin" className="nav-signin">
          Sign In
        </Link>

        <Link to="/cart" className="nav-cart">
          <span>🛒</span> Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;