const particlesConfig = {
  particles: {
    color: {
      value: ["#96f3ff", "#ccc8ff", "#ffd6f5", "#8fc9ff"],
    },

    twinkle: {
      particles: {
        enable: true,
        frequency: 0.05,
        opacity: 1,
        color: {
          value: "#ffffff",
        },
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
      value: 120,
    },

    links: {
      enable: true,
      distance: 150,
      color: {
        value: ["#b8f7ff", "#aea8ff", "#ffa9e9", "#e0f8ff"],
      },
      opacity: 0.3,
    },

    move: {
      enable: true,
      speed: 0.2,
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
