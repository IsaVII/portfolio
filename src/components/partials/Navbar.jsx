import { useEffect, useState } from "react";

const sections = ["about", "tools", "fullstack", "games"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = [];
    const handleScroll = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Element is in viewport if it occupies any significant portion of the viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          setActiveSection(id);
        }
      });
    };

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
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
            Web Projects
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
