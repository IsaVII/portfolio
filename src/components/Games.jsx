import { icons } from "../assets/icons.jsx";
import projects from "../assets/projects/games.json";
import ProjectCardGames from "../assets/projects/ProjectCardGames.jsx";
import UnityProjects from "./partials/UnityProjects.jsx";
import "../css/projects.css";

const Icon = ({ name }) => icons[name] ?? null;

export default function Games() {
  return (
    <section className="section" id="games">
      <h2 className="section-title">Games Projects</h2>
      {projects.map((project, index) => (
        <ProjectCardGames key={project.id} project={project} index={index} />
      ))}

      <UnityProjects />
    </section>
  );
}
