import { icons } from "../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function Games() {
  return (
    <>
      <section id="games" className="section">
        <h2 className="section-title">Games</h2>
        <p className="section-content"></p>
        <p className="section-content"></p>
      </section>
    </>
  );
}
