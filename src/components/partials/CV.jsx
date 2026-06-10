import { icons } from "../../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function CV() {
  return (
    <>
      <button
        id="cv-button"
        onClick={() =>
          window.open("../../../assets/Isa_Hellstrom_CV.pdf", "_blank")
        }
      >
        <span id="cv-button-text">View My CV</span>
        <Icon name="Document" />
      </button>
    </>
  );
}
