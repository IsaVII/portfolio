import { hasSquareBlockingElements } from "./maps/mapElements.js";

export function createPlayerController({
  grid,
  width,
  tileSize,
  getMapById,
  switchMap,
  checkPlayerEnemyCollision,
  canMoveTo,
  showTemporaryMessage,
  messages,
}) {
  let playerPosition = 22;
  let playerDirection = "down";

  // Smooth movement variables
  let currentX = 22 % width;
  let currentY = Math.floor(22 / width);
  let targetX = currentX;
  let targetY = currentY;
  const playerSpeed = 3; // Faster than enemies (1.5-2)

  // Animation variables
  let animationFrame = 0;
  let animationSpeed = 0.15; // Controls how fast sprite animation plays

  function createPlayer() {
    const existingPlayer = document.getElementById("player");
    if (existingPlayer) {
      if (existingPlayer.parentNode) {
        existingPlayer.parentNode.removeChild(existingPlayer);
      }
    }

    const playerElement = document.createElement("div");
    playerElement.className = `going-${playerDirection}`;
    playerElement.id = "player";

    playerElement.style.left = `${currentX * tileSize}px`;
    playerElement.style.top = `${currentY * tileSize}px`;
    playerElement.style.zIndex = Math.floor(currentY) * width;

    grid.appendChild(playerElement);
  }

  function movePlayer(
    direction,
    squares,
    enemies,
    gameRunning,
    currentMapId,
    switchMap,
    winGame,
  ) {
    if (!gameRunning) return;

    const playerElement = document.getElementById("player");
    let newGridPosition = playerPosition;

    switch (direction) {
      case "left":
        if (playerPosition % width !== 0) newGridPosition = playerPosition - 1;
        playerElement.className = "going-left";
        playerDirection = "left";
        break;

      case "right":
        if (playerPosition % width !== width - 1)
          newGridPosition = playerPosition + 1;
        playerElement.className = "going-right";
        playerDirection = "right";
        break;

      case "up":
        if (playerPosition - width >= 0)
          newGridPosition = playerPosition - width;
        playerElement.className = "going-up";
        playerDirection = "up";
        break;
      case "down":
        if (playerPosition + width < width * 9)
          newGridPosition = playerPosition + width;
        playerElement.className = "going-down";
        playerDirection = "down";
        break;
    }

    if (canMoveTo(newGridPosition, squares)) {
      const square = squares[newGridPosition];
      const activeMap = getMapById(currentMapId);

      playerPosition = newGridPosition;
      targetX = newGridPosition % width;
      targetY = Math.floor(newGridPosition / width);

      let doorKey = null;
      if (square.classList.contains("left-door")) doorKey = "door-l";
      if (square.classList.contains("top-door")) doorKey = "door-t";
      if (square.classList.contains("right-door")) doorKey = "door-r";
      if (square.classList.contains("bottom-door")) doorKey = "door-b";

      if (doorKey && activeMap.doors && activeMap.doors[doorKey]) {
        const doorConfig = activeMap.doors[doorKey];
        switchMap(doorConfig.nextMapId, doorKey);
        return;
      }

      if (square.classList.contains("goal")) {
        square.classList.remove("goal");
        winGame();
        return;
      }

      checkPlayerEnemyCollision(playerPosition, enemies);
    }
  }

  function updatePlayer(deltaTime) {
    const playerElement = document.getElementById("player");
    if (!playerElement) return;

    const isMoving = currentX !== targetX || currentY !== targetY;

    if (isMoving) {
      const speed = playerSpeed * deltaTime;

      // Move towards target
      if (currentX < targetX) {
        currentX = Math.min(currentX + speed, targetX);
      } else if (currentX > targetX) {
        currentX = Math.max(currentX - speed, targetX);
      }

      if (currentY < targetY) {
        currentY = Math.min(currentY + speed, targetY);
      } else if (currentY > targetY) {
        currentY = Math.max(currentY - speed, targetY);
      }

      // Update animation frame
      animationFrame += animationSpeed;
      if (animationFrame >= 1) {
        animationFrame = 0;
      }

      // Update sprite class based on animation frame
      const spriteIndex = Math.floor(animationFrame * 2); // 2 frames of animation
      const spriteClass =
        spriteIndex === 0
          ? `going-${playerDirection}`
          : `going-${playerDirection}-2`;
      playerElement.className = spriteClass;
    } else {
      // Idle animation - cycle between sprites slowly
      animationFrame += animationSpeed * 0.1; // Slower idle animation
      if (animationFrame >= 1) {
        animationFrame = 0;
      }
      const spriteIndex = Math.floor(animationFrame * 2);
      const spriteClass = `going-${playerDirection}`;
      playerElement.className = spriteClass;
    }

    playerElement.style.left = `${currentX * tileSize}px`;
    playerElement.style.top = `${currentY * tileSize}px`;
    playerElement.style.zIndex = Math.floor(currentY) * width;
  }

  function spawnPokeball(
    playerDirection,
    playerPosition,
    width,
    tileSize,
    grid,
    enemies,
  ) {
    let pokeballX = playerPosition % width;
    let pokeballY = Math.floor(playerPosition / width);

    switch (playerDirection) {
      case "left":
        pokeballX -= 1;
        break;
      case "right":
        pokeballX += 1;
        break;
      case "up":
        pokeballY -= 1;
        break;
      case "down":
        pokeballY += 1;
        break;
    }

    if (
      pokeballX >= 0 &&
      pokeballX < width &&
      pokeballY >= 0 &&
      pokeballY < 9
    ) {
      const pokeballElement = document.createElement("div");
      pokeballElement.className = "pokeball";
      pokeballElement.style.left = `${pokeballX * tileSize}px`;
      pokeballElement.style.top = `${pokeballY * tileSize}px`;
      pokeballElement.style.zIndex = 99999;
      grid.appendChild(pokeballElement);

      const hit = checkPokeballEnemyCollision(pokeballX, pokeballY, enemies);

      if (hit) {
        pokeballElement.style.animation = "pokeball-hit 1.4s ease-out forwards";
      } else {
        pokeballElement.style.animation =
          "pokeball-miss 1.4s ease-out forwards";
      }

      setTimeout(
        () => {
          if (pokeballElement.parentNode) {
            pokeballElement.parentNode.removeChild(pokeballElement);
          }
        },
        hit ? 1400 : 700,
      );
    }
  }

  function checkPokeballEnemyCollision(pokeballX, pokeballY, enemies) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      const enemyX = Math.round(enemy.x);
      const enemyY = Math.round(enemy.y);

      if (enemyX === pokeballX && enemyY === pokeballY) {
        enemy.element.style.transition = "transform 0.3s ease-in";
        enemy.element.style.transform = "scale(0)";

        setTimeout(() => {
          if (enemy.element && enemy.element.parentNode) {
            enemy.element.parentNode.removeChild(enemy.element);
          }
        }, 300);

        enemies.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  function setupKeyboardInput(
    movePlayerCallback,
    spawnPokeballCallback,
    gameRunning,
  ) {
    const handleKeyDown = (e) => {
      if (!gameRunning) return;
      switch (e.code) {
        case "ArrowLeft":
        case "a":
          e.preventDefault();
          movePlayerCallback("left");
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          movePlayerCallback("right");
          break;
        case "ArrowUp":
        case "w":
          e.preventDefault();
          movePlayerCallback("up");
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          movePlayerCallback("down");
          break;
        case "Space":
          e.preventDefault();
          spawnPokeballCallback();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  function resetPlayer() {
    playerPosition = 22;
    playerDirection = "down";
    currentX = 22 % width;
    currentY = Math.floor(22 / width);
    targetX = currentX;
    targetY = currentY;
    animationFrame = 0;
  }

  function setPlayerPosition(position) {
    playerPosition = position;
    currentX = position % width;
    currentY = Math.floor(position / width);
    targetX = currentX;
    targetY = currentY;
    animationFrame = 0;
  }

  function setPlayerDirection(direction) {
    playerDirection = direction;
  }

  function getPlayerPosition() {
    return playerPosition;
  }

  function getPlayerDirection() {
    return playerDirection;
  }

  return {
    createPlayer,
    movePlayer,
    updatePlayer,
    spawnPokeball,
    setupKeyboardInput,
    resetPlayer,
    setPlayerPosition,
    setPlayerDirection,
    getPlayerPosition,
    getPlayerDirection,
  };
}
