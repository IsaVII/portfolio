const particlesConfig = {
  particles: {
    paint: {
      color: {
        value: ["#96f3ff", "#ccc8ff", "#ffd6f5", "#8fc9ff"],
      },
    },

    shape: {
      type: "circle",
    },

    size: {
      value: { min: 1, max: 5 },
    },

    opacity: {
      value: { min: 0.6, max: 0.95 },
    },

    number: {
      value: 200,
    },

    links: {
      enable: true,
      distance: 150,
      color: {
        value: ["#96f3ff", "#ccc8ff", "#ffd6f5", "#8fc9ff"],
      },
      opacity: 0.3,
    },

    move: {
      enable: true,
      speed: { min: 0.2, max: 0.5 },
    },
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },

    modes: {
      repulse: {
        distance: 100,
        duration: 0.5,
      },
    },
  },
};

export default particlesConfig;
