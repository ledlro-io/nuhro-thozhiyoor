"use client"; // required for interactivity
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className={`nav ${menuOpen ? "active" : ""}`} id="nav">
        <div className="brand">
          <img src="/assets/nuhrothozhiyoor.png" alt="Nuhro Thozhiyoor Logo" />
          <div>
            <h1>Nuhro Thozhiyoor</h1>
            <span>Independent heritage initiative</span>
          </div>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#posts">Posts</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </header>
  );
}
