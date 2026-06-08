import Header from "./components/Header";
import About from "./components/About";
import Tools from "./components/Tools";

import { useEffect } from "react";

import particlesConfig from "./config/particlesConfig";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadTwinkleUpdater } from "@tsparticles/updater-twinkle";

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
      </section>
    </>
  );
}

export default App;
