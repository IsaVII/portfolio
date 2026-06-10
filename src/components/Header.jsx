import Navbar from "./partials/Navbar.jsx";
import Contact from "./partials/Contact.jsx";
import CV from "./partials/CV.jsx";

export default function Header() {
  return (
    <>
      <Contact />
      <header>
        <Navbar />
      </header>
      <CV />
    </>
  );
}
