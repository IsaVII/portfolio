import { hasSquareBlockingElements } from "./maps/mapElements.js";
import { moveEnemies } from "./enemies/enemies.js";
import { messages } from "./data/ui_data.js";
import { createPlayerController } from "./player.js";
import { createMapController } from "./map.js";

export function initGame() {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const levelDisplay = document.getElementById("level");
  const enemyDisplay = document.getElementById("enemies");

  const width = 10;
  const tileSize = 48;

  let squares = [];
  let score = 0;
  let currentMapId = 1;
  let enemies = [];
  let gameRunning = true;
  let canThrowBall = true;

  // Initialize controllers
  const mapController = createMapController({ grid, width, tileSize });
  const playerController = createPlayerController({
    grid,
    width,
    tileSize,
    getMapById: mapController.getMapById,
    checkPlayerEnemyCollision,
    canMoveTo,
    showTemporaryMessage,
    messages,
  });

  function createBoardCallback() {
    gameRunning = true;
    squares = mapController.createBoard(
      currentMapId,
      playerController.setPlayerPosition,
      playerController.setPlayerDirection,
      enemies,
      updateDisplay,
    );

    playerController.createPlayer();
    updateDisplay();
  }

  function canMoveTo(position, squaresToCheck) {
    if (position < 0 || position >= squaresToCheck.length) return false;
    const square = squaresToCheck[position];
    return hasSquareBlockingElements(square);
  }

  function checkPlayerEnemyCollision() {
    const playerPosition = playerController.getPlayerPosition();
    const playerX = playerPosition % width;
    const playerY = Math.floor(playerPosition / width);

    for (const enemy of enemies) {
      const enemyX = Math.round(enemy.x);
      const enemyY = Math.round(enemy.y);

      if (enemyX === playerX && enemyY === playerY) {
        gameOver();
        return;
      }
    }
  }

  function isWall(x, y) {
    const position = y * width + x;

    if (position < 0 || position >= squares.length) return true;

    const square = squares[position];
    return !hasSquareBlockingElements(square);
  }

  function spawnPokeball() {
    if (!canThrowBall) return;
    canThrowBall = false;
    setTimeout(() => {
      canThrowBall = true;
    }, 750);

    const playerPosition = playerController.getPlayerPosition();
    const playerDirection = playerController.getPlayerDirection();

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

      const hit = checkPokeballEnemyCollision(pokeballX, pokeballY);

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

  function checkPokeballEnemyCollision(pokeballX, pokeballY) {
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
        score++;

        if (enemies.length === 0) {
          mapController.initMapState(currentMapId).enemiesCleared = true;
        }

        updateDisplay();
        return true;
      }
    }
    return false;
  }

  function updateDisplay() {
    scoreDisplay.innerHTML = score;
    levelDisplay.innerHTML = currentMapId;
    enemyDisplay.innerHTML = enemies.length;
  }

  function showEnemiesRemainingMessaage() {
    grid.style.filter = "hue-rotate(0deg) saturate(2) brightness(1.5)";
    grid.style.boxShadow = "0 0 20px red";

    setTimeout(() => {
      grid.style.filter = "";
      grid.style.boxShadow = "";
    }, 300);

    showTemporaryMessage(messages.CatchAll, "red", 2000);
  }

  function showTemporaryMessage(message, color, duration) {
    const existingMessage = document.getElementById("temp-message");
    if (existingMessage) existingMessage.remove();

    const messageElement = document.createElement("div");
    messageElement.id = "temp-message";
    messageElement.innerHTML = message;
    messageElement.style.color = color;
    grid.appendChild(messageElement);

    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, duration);
  }

  //MAP
  function switchMap(nextMapId, direction) {
    if (enemies.length > 0) {
      showEnemiesRemainingMessaage();
      return;
    }

    currentMapId = nextMapId;
    mapController.switchMap(
      nextMapId,
      direction,
      (id) => {
        currentMapId = id;
      },
      playerController.setPlayerPosition,
      playerController.setPlayerDirection,
      playerController.createPlayer,
      createBoardCallback,
      () => {
        enemies = [];
      },
    );
  }

  let lastTime = 0;
  let animationId;

  function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    if (gameRunning && deltaTime < 0.1) {
      playerController.updatePlayer(deltaTime);
      moveEnemies(enemies, deltaTime, isWall, width);
      checkPlayerEnemyCollision();
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function gameOver() {
    gameRunning = false;
    grid.style.filter = "hue-rotate(0deg) saturate(0.2) brightness(0.9)";
    grid.style.boxShadow = "0 0 20px red";
    showTemporaryMessage(`${messages.GameOver} ${score}`, "white", 3000);

    setTimeout(() => {
      mapController.resetMapStates();

      currentMapId = 1;
      grid.style.filter = "";
      grid.style.boxShadow = "";
      playerController.resetPlayer();
      score = 0;
      createBoardCallback();
    }, 3000);
  }

  // Setup input handler
  const handleKeyDown = (e) => {
    if (!gameRunning) {
      if (e.code === "Space") e.preventDefault();
      return;
    }

    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        e.preventDefault();
        TryMovePlayer("left");
        break;
      case "ArrowRight":
      case "KeyD":
        e.preventDefault();
        TryMovePlayer("right");
        break;
      case "ArrowUp":
      case "KeyW":
        e.preventDefault();
        TryMovePlayer("up");

        break;
      case "ArrowDown":
      case "KeyS":
        e.preventDefault();
        TryMovePlayer("down");
        break;
      case "Space":
        e.preventDefault();
        spawnPokeball();
        break;
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  function TryMovePlayer(direction) {
    playerController.movePlayer(
      direction,
      squares,
      enemies,
      gameRunning,
      currentMapId,
      switchMap,
      winGame,
    );
  }

  function winGame() {
    gameRunning = false;
    showTemporaryMessage(`${messages.YouWin} ${score}`, "green", 100000);
    setTimeout(() => {
      mapController.resetMapStates();

      currentMapId = 1;
      grid.style.filter = "";
      grid.style.boxShadow = "";
      playerController.resetPlayer();
      score = 0;
      createBoardCallback();
    }, 100000);
  }

  createBoardCallback();
  animationId = requestAnimationFrame(gameLoop);

  return function cleanup() {
    cancelAnimationFrame(animationId);
    document.removeEventListener("keydown", handleKeyDown);
    gameRunning = false;
  };
}
