import { useEffect, useState } from "react";

const sections = ["about", "tools", "fullstack", "games", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav>
      <button
        className={`nav-hamburger${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      <ul className={menuOpen ? "nav-open" : ""}>
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? "nav-active" : ""}
            onClick={handleLinkClick}
          >
            About Me
          </a>
        </li>
        <li>
          <a
            href="#tools"
            className={activeSection === "tools" ? "nav-active" : ""}
            onClick={handleLinkClick}
          >
            Tools
          </a>
        </li>
        <li>
          <a
            href="#fullstack"
            className={activeSection === "fullstack" ? "nav-active" : ""}
            onClick={handleLinkClick}
          >
            Full-stack
          </a>
        </li>
        <li>
          <a
            href="#games"
            className={activeSection === "games" ? "nav-active" : ""}
            onClick={handleLinkClick}
          >
            Games
          </a>
        </li>
      </ul>
    </nav>
  );
}
