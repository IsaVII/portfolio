import { useState } from "react";

const TAG_COLORS = {
  HTML: { bg: "#e34c26", color: "#fff" },
  CSS: { bg: "#264de4", color: "#fff" },
  JS: { bg: "#f7df1e", color: "#000" },
  Java: { bg: "#007396", color: "#fff" },
  React: { bg: "#61dafb", color: "#000" },
  NodeJS: { bg: "#3c873a", color: "#fff" },
  ExpressJS: { bg: "#404040", color: "#fff" },
  MongoDB: { bg: "#47a248", color: "#fff" },
  TailwindCSS: { bg: "#38b2ac", color: "#fff" },
};

const BASE = import.meta.env.BASE_URL;

function ProjectCard({ project, index }) {
  const [currentImage, setCurrentImage] = useState(0);

  const isReversed = index % 2 !== 0;
  const hasMultipleImages = project.imageUrl.length > 1;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === project.imageUrl.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.imageUrl.length - 1 : prev - 1,
    );
  };

  return (
    <article className={`project-card ${isReversed ? "reverse" : ""}`}>
      {/* Mobile title */}
      <h2 className="project-title-mobile project-title">{project.name}</h2>

      {/* Images */}
      <div className="project-images">
        <div className="carousel">
          {hasMultipleImages && <button onClick={prevImage}>◀</button>}

          <a
            href={`${BASE}${project.imageUrl[currentImage]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${BASE}${project.imageUrl[currentImage]}`}
              alt={project.name}
            />
          </a>

          {hasMultipleImages && <button onClick={nextImage}>▶</button>}
        </div>
      </div>

      {/* CONTENT */}
      <div className="project-content">
        {/* Desktop title */}
        <div className="project-title-date-combination">
          <h2 className="project-title-desktop project-title">
            {project.name}
          </h2>

          <p className="project-date">{project.date}</p>
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => {
            const style = TAG_COLORS[tag] ?? { bg: "#e5e5e5", color: "#000" };
            return (
              <span
                key={tag}
                className="tag"
                style={{ background: style.bg, color: style.color }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <p>{project.description}</p>

        <ul>
          {project.bulletPoints.map((point) => (
            <li key={point}>
              <span>💠</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ProjectCard;
