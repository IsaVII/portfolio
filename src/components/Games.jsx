import { icons } from "../assets/icons.jsx";
<<<<<<< Updated upstream
=======
import projects from "../assets/projects/games.json";
import ProjectCardGames from "../assets/projects/ProjectCardGames.jsx";
import UnityProjects from "./partials/UnityProjects.jsx";
import "../css/projects.css";
>>>>>>> Stashed changes

const Icon = ({ name }) => icons[name] ?? null;

export default function Games() {
  return (
<<<<<<< Updated upstream
    <>
      <section id="games" className="section">
        <h2 className="section-title">Games</h2>
        <p className="section-content"></p>
        <p className="section-content"></p>
      </section>
    </>
=======
    <section className="projects section" id="games">
      <h2 className="section-title">Games Projects</h2>
      {projects.map((project, index) => (
        <ProjectCardGames key={project.id} project={project} index={index} />
      ))}

      <UnityProjects />
    </section>
>>>>>>> Stashed changes
  );
}
