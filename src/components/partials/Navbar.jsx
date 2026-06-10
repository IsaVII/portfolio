import { useEffect, useState } from "react";

const sections = ["about", "tools", "fullstack", "games", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <nav>
      <ul>
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? "nav-active" : ""}
          >
            About Me
          </a>
        </li>
        <li>
          <a
            href="#tools"
            className={activeSection === "tools" ? "nav-active" : ""}
          >
            Tools
          </a>
        </li>
        <li>
          <a
            href="#fullstack"
            className={activeSection === "fullstack" ? "nav-active" : ""}
          >
            Full-stack
          </a>
        </li>
        <li>
          <a
            href="#games"
            className={activeSection === "games" ? "nav-active" : ""}
          >
            Games
          </a>
        </li>
      </ul>
    </nav>
  );
}
