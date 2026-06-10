import ZeldaGame from "../assets/game/zeldagame";

export default function About() {
  return (
    <>
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>

        <div className="about-wrapper">
          <div className="container-left">
            <ZeldaGame />
          </div>

          <div className="container-right">
            <p className="section-content header">
              Hi, I'm <b>Isa</b>,
            </p>
            <p className="tab">
              a <i>Software</i> and
              <br />
              <i> Games Developer</i>
            </p>
            <br />
            <p className="section-content">
              Currently, I am transitioning from a background in{" "}
              <b>game development</b> to a focus on <b>web development</b>.
              <br />
              <br />I have a strong passion for learning and am eager to expand
              my skill set, while still maintaining my love for game development
              in my free time.
            </p>

            <div className="experience-wrapper">
              <div className="experience-item">
                <span className="experience-title sphere-shape">8+</span>
                <p className="experience-description">
                  Years of programming experience
                </p>
              </div>

              <div className="experience-item">
                <span className="experience-title sphere-shape">3+</span>
                <p className="experience-description">programming languages</p>
              </div>

              <div className="experience-item">
                <span className="experience-title sphere-shape">2</span>
                <p className="experience-description">
                  Game engines worked with
                </p>
              </div>

              <div className="experience-item">
                <span
                  className="experience-title sphere-shape"
                  style={{ fontSize: "3em" }}
                >
                  ∞
                </span>
                <p className="experience-description">Motivation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
