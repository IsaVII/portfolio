import Header from "./components/Header";
import About from "./components/About";
import Tools from "./components/Tools";

import { useEffect } from "react";

import particlesConfig from "./config/particlesConfig";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadTwinkleUpdater } from "@tsparticles/updater-twinkle";
import Fullstack from "./components/Fullstack.jsx";
import Games from "./components/Games.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles);
      await loadTwinkleUpdater(tsParticles);

      await tsParticles.load({
        id: "tsparticles",
        options: particlesConfig,
      });
    };

    initParticles();
  }, []);

  return (
    <>
      <div id="tsparticles" />

      <section id="header">
        <Header />
      </section>

      <section id="center">
        <About />
        <Tools />
        <Fullstack />
        <Games />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </>
  );
}

export default App;
