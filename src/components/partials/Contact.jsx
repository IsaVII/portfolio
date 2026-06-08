import { icons } from "../../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function Contact() {
  return (
    <section id="contact">
      <a
        href="https://linkedin.com/in/isa-hellström-229aa6187/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="contact-group">
          <div className="icon-holder">
            <Icon name="Linkedin" />
          </div>
          <span className="contact-text bold">Isa Hellström</span>
        </div>
      </a>

      <a
        className="contact-item text-link"
        href="mailto:isahellstroem@gmail.com"
      >
        <div className="contact-group">
          <div className="icon-holder mailto">
            <Icon name="MailTo" />
          </div>
          isahellstroem@gmail.com
        </div>
      </a>
    </section>
  );
}
