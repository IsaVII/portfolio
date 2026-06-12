import { icons } from "../../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

const BASE = import.meta.env.BASE_URL;

export default function CV() {
  return (
    <>
      <button
        id="cv-button"
        onClick={() => window.open(`${BASE}CV_IsaHellström.pdf`, "_blank")}
      >
        <span id="cv-button-text">View My CV</span>
        <Icon name="Document" />
      </button>
    </>
  );
}
