import { icons } from "../../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function Contact() {
  return (
    <section id="contact">
      <div className="iconGroup">
        <Icon name="Cplusplus" />
        <Icon name="Csharp" />
        <Icon name="Css" />
        <Icon name="Html5" />
        <Icon name="Javascript" />
        <Icon name="React" />
        <Icon name="Nodedotjs" />
        <Icon name="Nextdotjs" />
        <Icon name="Express" />
        <Icon name="Mongodb" />
        <Icon name="TailwindCss" />
        <Icon name="Vite" />
        <Icon name="UnrealEngine" />
        <Icon name="Unity" />
      </div>
      <Icon name="Document" />
      <Icon name="MailTo" />
      <Icon name="Linkedin" />

      <h1>Contact</h1>
    </section>
  );
}
