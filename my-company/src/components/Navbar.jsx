// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    margin: "10px",
    textDecoration: "none",
    color: "blue"
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link style={navStyle} to="/">Home</Link>
      <Link style={navStyle} to="/about">About</Link>
      <Link style={navStyle} to="/services">Services</Link>
      <Link style={navStyle} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
