import React from "react";
import { Link } from "react-router-dom"; // Import Link component

export default function Header() {
  return (
    <header className="navbar p-2 m-auto flex-row-bet position-absolute w-90">
      <Link to="/" className="navbar-logo text-dark font-lg font-weight-800">
        DarkWaves.Dev
      </Link>
      <nav className="w-30 flex-row-aro font-weight-600">
        <Link to="/home" className="navbar-link text-dark">
          Home
        </Link>
        <Link to="/about" className="navbar-link text-dark">
          About
        </Link>
        <Link to="/contact" className="navbar-link text-dark">
          Contact
        </Link>
        <Link to="/projects" className="navbar-link text-dark">
          Projects
        </Link>
      </nav>
    </header>
  );
}
