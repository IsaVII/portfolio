const ENEMY_CONFIGS = {
  diglett: {
    className: "diglett",
    char: "*",
    defaultDirection: -1,
    // axis: "x" — moves horizontally, speed 2
    moveAxis: "x",
    speed: 2,
    timerRange: null,
  },
  butterfree: {
    className: "butterfree",
    char: "}",
    defaultDirection: -1,
    moveAxis: "y",
    speed: 1.5,
    timerRange: 5,
  },
};

export const ENEMY_CHARS = {
  "*": "diglett",
  "}": "butterfree",
};

export function createEnemy(type, x, y, gridElement) {
  const cfg = ENEMY_CONFIGS[type];
  if (!cfg) throw new Error(`Unknown enemy type: ${type}`);

  const element = document.createElement("div");
  element.className = cfg.className;
  element.style.left = `${x * 48}px`;
  element.style.top = `${y * 48}px`;
  gridElement.appendChild(element);

  return {
    x,
    y,
    type,
    direction: cfg.defaultDirection,
    speed: cfg.speed,
    moveAxis: cfg.moveAxis,
    timer: cfg.timerRange ? Math.random() * cfg.timerRange : null,
    timerRange: cfg.timerRange,
    element,
  };
}

export function moveEnemies(enemies, deltaTime, isWall, width) {
  for (const enemy of enemies) {
    moveEnemy(enemy, deltaTime, isWall, width);
  }
}

function moveEnemy(enemy, deltaTime, isWall, width) {
  const speed = enemy.speed * deltaTime;
  const axis = enemy.moveAxis; // "x" or "y"
  const limit = axis === "x" ? width : 9;

  if (enemy.timer !== null) {
    enemy.timer -= deltaTime;
    if (enemy.timer <= 0) {
      enemy.direction *= -1;
      enemy.timer = Math.random() * enemy.timerRange;
    }
  }

  const newVal = enemy[axis] + enemy.direction * speed;
  const otherAxis = axis === "x" ? Math.round(enemy.y) : Math.round(enemy.x);
  const rounded = Math.round(newVal);

  const wallX = axis === "x" ? rounded : otherAxis;
  const wallY = axis === "x" ? otherAxis : rounded;

  if (newVal < 0 || newVal >= limit || isWall(wallX, wallY)) {
    enemy.direction *= -1;
  } else {
    enemy[axis] = newVal;
  }

  enemy.element.style[axis === "x" ? "left" : "top"] = `${enemy[axis] * 48}px`;

  enemy.element.style.zIndex = 9 + Math.round(enemy.y) * width;
}
