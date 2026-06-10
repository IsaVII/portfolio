import { icons } from "../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function Fullstack() {
  return (
    <>
      <section id="fullstack" className="section">
        <h2 className="section-title">Full-stack</h2>
        <p className="section-content"></p>

        <p className="section-content"></p>
      </section>
    </>
  );
}
