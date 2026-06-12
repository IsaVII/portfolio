import { useState } from "react";

const BASE = import.meta.env.BASE_URL;

const unityImages = [
  "images/projects/Unity/IdleHorrorStory.jpg",
  "images/projects/Unity/MH_DecoMode.png",
  "images/projects/Unity/Neverrift_Image_1.png",
  "images/projects/Unity/Bubbles.png",
  "images/projects/Unity/Unicorn.png",
];

export default function UnityProjects() {
  const [currentUnityImage, setCurrentUnityImage] = useState(0);

  const nextImage_unity = () => {
    setCurrentUnityImage((prevUnity) =>
      prevUnity === unityImages.length - 1 ? 0 : prevUnity + 1,
    );
  };

  const prevImage_unity = () => {
    setCurrentUnityImage((prevUnity) =>
      prevUnity === 0 ? unityImages.length - 1 : prevUnity - 1,
    );
  };

  return (
    <section className="projects section" id="unity-projects">
      <h2 className="project-title">Unity Projects</h2>
      2018-2023: diverse Unity projects, both solo and in teams, including game
      jams and prototypes.
      <div className="carousel">
        {<button onClick={prevImage_unity}>◀</button>}

        <a
          href={`${BASE}${unityImages[currentUnityImage]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${BASE}${unityImages[currentUnityImage]}`}
            alt="Unity projects"
          />
        </a>

        {<button onClick={nextImage_unity}>▶</button>}
      </div>
    </section>
  );
}
