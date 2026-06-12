import {
  TILE_CLASSES,
  ENEMY_CHARS,
  hasSquareBlockingElements,
  isDoorChar,
} from "./maps/mapElements.js";
import { createEnemy, moveEnemies } from "./enemies/enemies.js";
import { maps } from "./maps/maps.js";
import { messages } from "./data/ui_data.js";

export function initGame() {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const levelDisplay = document.getElementById("level");
  const enemyDisplay = document.getElementById("enemies");

  const width = 10;
  const tileSize = 48;

  const squares = [];
  let score = 0;
  let currentMapId = 1;
  let playerPosition = 22;
  let enemies = [];
  let playerDirection = "down";
  let gameRunning = true;

  const mapStates = {};

  function getMapById(id) {
    return maps.find((m) => m.id === id) || maps[0];
  }

  function initMapState(id) {
    if (!mapStates[id]) {
      mapStates[id] = {
        enemiesCleared: false,
      };
    }
    return mapStates[id];
  }

  function createBoard() {
    gameRunning = true;
    grid.innerHTML = "";
    squares.length = 0;
    enemies = [];

    const currentMap = getMapById(currentMapId).layout;
    const state = initMapState(currentMapId);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.setAttribute("id", i * width + j);
        const char = currentMap[i][j];

        if (isDoorChar(char)) {
          square.style.zIndex = 0;
        } else {
          square.style.zIndex = i * width + j;
        }

        addMapElement(square, char, j, i, state.enemiesCleared);

        grid.appendChild(square);
        squares.push(square);
      }
    }

    createPlayer();
    updateDisplay();
  }

  //PLAYER
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

    playerElement.style.left = `${(playerPosition % width) * tileSize}px`;
    playerElement.style.top = `${Math.floor(playerPosition / width) * tileSize}px`;
    playerElement.style.zIndex = Math.floor(playerPosition / width) * width;

    grid.appendChild(playerElement);
  }

  function movePlayer(direction) {
    const playerElement = document.getElementById("player");
    let newPosition = playerPosition;

    switch (direction) {
      case "left":
        if (playerPosition % width !== 0) newPosition = playerPosition - 1;
        playerElement.className = "going-left";
        playerDirection = "left";
        break;

      case "right":
        if (playerPosition % width !== width - 1)
          newPosition = playerPosition + 1;
        playerElement.className = "going-right";
        playerDirection = "right";
        break;

      case "up":
        if (playerPosition - width >= 0) newPosition = playerPosition - width;
        playerElement.className = "going-up";
        playerDirection = "up";
        break;
      case "down":
        if (playerPosition + width < width * 9)
          newPosition = playerPosition + width;
        playerElement.className = "going-down";
        playerDirection = "down";
        break;
    }

    if (canMoveTo(newPosition)) {
      const square = squares[newPosition];
      const activeMap = getMapById(currentMapId);

      let doorKey = null;
      if (square.classList.contains("left-door")) doorKey = "door-l";
      if (square.classList.contains("top-door")) doorKey = "door-t";
      if (square.classList.contains("right-door")) doorKey = "door-r";
      if (square.classList.contains("bottom-door")) doorKey = "door-b";

      if (doorKey && activeMap.doors && activeMap.doors[doorKey]) {
        const doorConfig = activeMap.doors[doorKey];

        // Block forward/up progression if enemies still exist
        // if (enemies.length > 0) {
        //   showEnemiesRemainingMessaage();
        //   return;
        // }

        switchMap(doorConfig.nextMapId, doorKey);
        return;
      }

      playerPosition = newPosition;

      playerElement.style.left = `${(playerPosition % width) * tileSize}px`;
      playerElement.style.top = `${Math.floor(playerPosition / width) * tileSize}px`;
      playerElement.style.zIndex = Math.floor(playerPosition / width) * width;

      if (square.classList.contains("goal")) {
        showTemporaryMessage(`${messages.YouWin} ${score}`, "green", 100000);

        gameRunning = false;

        square.classList.remove("goal");
        square.classList.add(" ");
        return;
      }

      checkPlayerEnemyCollision();
    }
  }

  const handleKeyDown = (e) => {
    if (!gameRunning) return;
    switch (e.code) {
      case "ArrowLeft":
      case "a":
        e.preventDefault();
        movePlayer("left");
        break;
      case "ArrowRight":
      case "d":
        e.preventDefault();
        movePlayer("right");
        break;
      case "ArrowUp":
      case "w":
        e.preventDefault();
        movePlayer("up");
        break;
      case "ArrowDown":
      case "s":
        e.preventDefault();
        movePlayer("down");
        break;
      case "Space":
        e.preventDefault();
        spawnPokeball();
        break;
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  function isWall(x, y) {
    const position = y * width + x;

    if (position < 0 || position >= squares.length) return true;

    const square = squares[position];
    return !hasSquareBlockingElements(square);
  }

  function checkPlayerEnemyCollision() {
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

  function spawnPokeball() {
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

      const hit = checkPokeballEnemeyCollision(pokeballX, pokeballY);

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

  function checkPokeballEnemeyCollision(pokeballX, pokeballY) {
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
          initMapState(currentMapId).enemiesCleared = true;
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

  function canMoveTo(position) {
    if (position < 0 || position >= squares.length) return false;

    const square = squares[position];
    return hasSquareBlockingElements(square);
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
    currentMapId = nextMapId;
    const targetMap = getMapById(nextMapId);

    switch (direction) {
      case "door-t":
        playerDirection = "up";
        break;
      case "door-b":
        playerDirection = "down";
        break;
      case "door-l":
        playerDirection = "left";
        break;
      case "door-r":
        playerDirection = "right";
        break;
      default:
        playerDirection = "down"; // fallback default
    }

    let startPos = targetMap.doorsFrom[direction]
      ? targetMap.doorsFrom[direction]
      : 41;
    playerPosition = startPos;

    createBoard();
  }

  function addMapElement(square, char, x, y) {
    if (TILE_CLASSES[char]) {
      square.classList.add(TILE_CLASSES[char]);
    } else if (ENEMY_CHARS[char]) {
      if (!initMapState(currentMapId).enemiesCleared) {
        const enemy = createEnemy(ENEMY_CHARS[char], x, y, grid);
        enemies.push(enemy);
      }
    }

    // space = walkable, no class needed
  }

  let lastTime = 0;
  let animationId;

  function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    if (gameRunning && deltaTime < 0.1) {
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
      for (const key in mapStates) delete mapStates[key];

      currentMapId = 1;
      grid.style.filter = "";
      grid.style.boxShadow = "";
      playerPosition = 22;
      playerDirection = "down";
      score = 0;
      createBoard();
    }, 3000);
  }

  createBoard();

  animationId = requestAnimationFrame(gameLoop);

  return function cleanup() {
    cancelAnimationFrame(animationId);
    document.removeEventListener("keydown", handleKeyDown);
    gameRunning = false;
  };
}
