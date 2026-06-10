import { icons } from "../assets/icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

export default function Tools() {
  return (
    <>
      <section id="tools" className="section">
        <h2 className="section-title">Tools</h2>
        <span id="tools-note">
          * indicates tools I'm currently learning or have basic experience
          with.
        </span>
        <div className="tools-list">
          <span className="tool-item-pair">
            <Icon name="Csharp" />
            <span className="tool-item">C#</span>
          </span>

          <span className="tool-item-pair">
            <Icon name="Cplusplus" />
            <span className="tool-item">C++</span>
          </span>

          <span className="tool-item-pair">
            <Icon name="Python" />
            <span className="tool-item">Python*</span>
          </span>
        </div>
        <div className="tools-list">
          <span className="tool-item-pair">
            <Icon name="Html5" />
            <span className="tool-item">HTML5</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Css" />
            <span className="tool-item">CSS3</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Javascript" />
            <span className="tool-item">JavaScript*</span>
          </span>
        </div>
        <div className="tools-list">
          <span className="tool-item-pair">
            <Icon name="React" />
            <span className="tool-item">React*</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Nodejs" />
            <span className="tool-item">Node.js*</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Nextjs" />
            <span className="tool-item">Next.js*</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Expressjs" />
            <span className="tool-item">Express.js*</span>
          </span>
          <span className="tool-item-pair">
            <Icon name="Mongodb" />
            <span className="tool-item">MongoDB*</span>
          </span>
        </div>
        <div className="tools-list">
          <span className="tool-item-pair">
            <Icon name="UnrealEngine" />
            <span className="tool-item">Unreal Engine</span>
          </span>

          <span className="tool-item-pair">
            <Icon name="Unity" />
            <span className="tool-item">Unity</span>
          </span>
        </div>
      </section>
    </>
  );
}
