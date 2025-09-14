// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    margin: "0 10px",
    textDecoration: "none",
    color: "white"
  };

  const navBarContainer = {
    display: "flex",               // required
    justifyContent: "space-around", // required
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#007BFF"     // required
  };

  return (
    <nav style={navBarContainer}>
      <Link style={navStyle} to="/">Home</Link>
      <Link style={navStyle} to="/about">About</Link>
      <Link style={navStyle} to="/services">Services</Link>
      <Link style={navStyle} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
