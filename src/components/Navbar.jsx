import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-links">
        <div className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="about" >About-me</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar
