export function initGame() {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const levelDisplay = document.getElementById("level");
  const enemyDisplay = document.getElementById("enemies");

  const width = 10;
  const tileSize = 48;

  const squares = [];
  let score = 0;
  let level = 0;
  let playerPosition = 40;
  let enemies = [];
  let playerDirection = "right";
  let gameRunning = true;

  //y,w,x,z | a,b = side walls | c,d = top/bottom walls
  // ) = lanterns |  ( = fire pots |  %  = left door |  ^ = top door | $ = stairs
  // * = slicer enemy |  } = skeleton enemy | (space) = empty walkable area
  const maps = [
    //Level 1 layout
    [
      "ycc)cc^ccw",
      "a        b",
      "a     *  b",
      "a    (   b",
      "%    }   b",
      "a (      b",
      "a    (   b",
      "a       *b",
      "xdd)dd)ddz",
    ],

    [
      "ycc)cc^ccw",
      "a   *    b",
      "a    (*  b",
      "a     $  b",
      "% ( }    b",
      "a    (   b",
      "a       *b",
      "a     $  b",
      "xdd)dd)ddz",
    ],
  ];

  function createBoard() {
    gameRunning = true;
    grid.innerHTML = "";
    squares.length = 0;
    enemies = [];

    const currentMap = maps[level];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.setAttribute("id", i * width + j);

        const char = currentMap[i][j];
        addMapElement(square, char, j, i);

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
    playerElement.className = "link-going-right";
    playerElement.id = "player";

    playerElement.style.left = `${(playerPosition % width) * tileSize}px`;
    playerElement.style.top = `${Math.floor(playerPosition / width) * tileSize}px`;

    grid.appendChild(playerElement);
  }

  function movePlayer(direction) {
    const playerElement = document.getElementById("player");
    let newPosition = playerPosition;

    switch (direction) {
      case "left":
        if (playerPosition % width !== 0) newPosition = playerPosition - 1;
        playerElement.className = "link-going-left";
        playerDirection = "left";
        break;

      case "right":
        if (playerPosition % width !== width - 1)
          newPosition = playerPosition + 1;
        playerElement.className = "link-going-right";
        playerDirection = "right";
        break;

      case "up":
        if (playerPosition - width >= 0) newPosition = playerPosition - width;
        playerElement.className = "link-going-up";
        playerDirection = "up";
        break;
      case "down":
        if (playerPosition + width < width * 9)
          newPosition = playerPosition + width;
        playerElement.className = "link-going-down";
        playerDirection = "down";
        break;
    }

    if (canMoveTo(newPosition)) {
      const square = squares[newPosition];

      if (square.classList.contains("left-door")) {
        square.classList.remove("left-door");
      }

      if (
        square.classList.contains("top-door") ||
        square.classList.contains("stairs")
      ) {
        if (enemies.length === 0) {
          nextLevel();
        } else {
          showEnemiesRemainingMessaage();
        }
        return;
      }

      playerPosition = newPosition;
      playerElement.style.left = `${(playerPosition % width) * tileSize}px`;
      playerElement.style.top = `${Math.floor(playerPosition / width) * tileSize}px`;
      checkPlayerEnemyCollision();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;
    switch (e.code) {
      case "ArrowLeft":
      case "d":
        e.preventDefault();
        movePlayer("left");
        break;

      case "ArrowRight":
      case "a":
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
        spawnKaboom();
        break;
    }
  });

  //ENEMIES
  function createSlicer(x, y) {
    const slicerElement = document.createElement("div");
    slicerElement.className = "slicer";

    slicerElement.style.left = `${x * tileSize}px`;
    slicerElement.style.top = `${y * tileSize}px`;

    const slicer = {
      x,
      y,
      direction: -1,
      type: "slicer",
      element: slicerElement,
    };

    enemies.push(slicer);

    grid.appendChild(slicerElement);
  }

  function createSkeleton(x, y) {
    const skeletonElement = document.createElement("div");
    skeletonElement.className = "skeleton";

    skeletonElement.style.left = `${x * tileSize}px`;
    skeletonElement.style.top = `${y * tileSize}px`;

    const skeleton = {
      x,
      y,
      direction: -1,
      timer: Math.random() * 5,
      type: "skeleton",
      element: skeletonElement,
    };

    enemies.push(skeleton);

    grid.appendChild(skeletonElement);
  }

  function moveEnemies(deltaTime) {
    for (const enemy of enemies) {
      if (enemy.type === "slicer") {
        moveSlicer(enemy, deltaTime);
      } else if (enemy.type === "skeleton") {
        moveSkeleton(enemy, deltaTime);
      }
    }
  }

  function moveSlicer(slicer, deltaTime) {
    const speed = 2 * deltaTime;
    const newX = slicer.x + slicer.direction * speed;
    const y = Math.round(slicer.y);

    if (newX < 0 || newX >= width || isWall(Math.round(newX), y)) {
      slicer.direction *= -1;
    } else {
      slicer.x = newX;
    }

    slicer.element.style.left = `${slicer.x * tileSize}px`;
  }

  function moveSkeleton(skeleton, deltaTime) {
    const speed = 1.5 * deltaTime;
    if (skeleton.timer <= 0) {
      skeleton.direction *= -1;
      skeleton.timer = Math.random() * 5;
    }

    const newY = skeleton.y + skeleton.direction * speed;
    const newX = Math.round(skeleton.x);

    if (newY < 0 || newY >= 9 || isWall(newX, Math.round(newY))) {
      skeleton.direction *= -1;
    } else {
      skeleton.y = newY;
    }

    skeleton.element.style.top = `${skeleton.y * tileSize}px`;
  }

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

  function spawnKaboom() {
    let kaboomX = playerPosition % width;
    let kaboomY = Math.floor(playerPosition / width);

    switch (playerDirection) {
      case "left":
        kaboomX -= 1;
        break;
      case "right":
        kaboomX += 1;
        break;
      case "up":
        kaboomY -= 1;
        break;
      case "down":
        kaboomY += 1;
        break;
    }

    if (kaboomX >= 0 && kaboomX < width && kaboomY >= 0 && kaboomY < 9) {
      const kaboomElement = document.createElement("div");
      kaboomElement.className = "kaboom";
      kaboomElement.style.left = `${kaboomX * tileSize}px`;
      kaboomElement.style.top = `${kaboomY * tileSize}px`;
      grid.appendChild(kaboomElement);

      checkKaboomEnemeyCollision(kaboomX, kaboomY);

      setTimeout(() => {
        if (kaboomElement.parentNode) {
          kaboomElement.parentNode.removeChild(kaboomElement);
        }
      }, 1000);
    }
  }

  function checkKaboomEnemeyCollision(kaboomX, kaboomY) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      const enemyX = Math.round(enemy.x);
      const enemyY = Math.round(enemy.y);

      if (enemyX === kaboomX && enemyY === kaboomY) {
        if (enemy.element && enemy.element.parentNode) {
          enemy.element.parentNode.removeChild(enemy.element);
        }

        enemies.splice(i, 1);
        score++;
        updateDisplay();
        break;
      }
    }
  }

  function updateDisplay() {
    scoreDisplay.innerHTML = score;
    levelDisplay.innerHTML = level + 1;
    enemyDisplay.innerHTML = enemies.length;
  }

  function canMoveTo(position) {
    if (position < 0 || position >= squares.length) return false;

    const square = squares[position];
    return hasSquareBlockingElements(square);
  }

  function hasSquareBlockingElements(square) {
    return (
      !square.classList.contains("left-wall") &&
      !square.classList.contains("right-wall") &&
      !square.classList.contains("top-wall") &&
      !square.classList.contains("bottom-wall") &&
      !square.classList.contains("top-left-wall") &&
      !square.classList.contains("top-right-wall") &&
      !square.classList.contains("bottom-left-wall") &&
      !square.classList.contains("bottom-right-wall") &&
      !square.classList.contains("lantern") &&
      !square.classList.contains("fire-pot")
    );
  }

  function showEnemiesRemainingMessaage() {
    grid.style.filter = "hue-rotate(0deg) saturate(2) brightness(1.5)";
    grid.style.boxShadow = "0 0 20px red";

    setTimeout(() => {
      grid.style.filter = "";
      grid.style.boxShadow = "";
    }, 300);

    showTemporaryMessage("Defeat all enemies first!", "red", 2000);
  }

  function showTemporaryMessage(message, color, duration) {
    const existingMessage = document.getElementById("temp-message");
    if (existingMessage) existingMessage.remove();

    const messageElement = document.createElement("div");
    messageElement.id = "temp-message";
    messageElement.textContent = message;
    messageElement.style.color = color;
    grid.appendChild(messageElement);

    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 2000);
  }

  //MAP
  function nextLevel() {
    level = (level + 1) % maps.length;
    createBoard();
  }

  function addMapElement(square, char, x, y) {
    switch (char) {
      //Walls
      case "a":
        square.classList.add("left-wall");
        break;

      case "b":
        square.classList.add("right-wall");
        break;

      case "c":
        square.classList.add("top-wall");
        break;

      case "d":
        square.classList.add("bottom-wall");
        break;

      case "w":
        square.classList.add("top-right-wall");
        break;

      case "y":
        square.classList.add("top-left-wall");
        break;

      case "z":
        square.classList.add("bottom-right-wall");
        break;

      case "x":
        square.classList.add("bottom-left-wall");
        break;

      //Doors & objects
      case "%":
        square.classList.add("left-door");
        break;
      case "^":
        square.classList.add("top-door");
        break;
      case "$":
        square.classList.add("stairs");
        break;
      case ")":
        square.classList.add("lantern");
        break;
      case "(":
        square.classList.add("fire-pot");
        break;

      // enemies
      case "*":
        createSlicer(x, y);
        break;

      case "}":
        createSkeleton(x, y);
        break;
    }
  }

  let lastTime = 0;
  let animationId;

  function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    if (gameRunning && deltaTime < 0.1) {
      moveEnemies(deltaTime);
      checkPlayerEnemyCollision();
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function gameOver() {
    gameRunning = false;
    grid.style.filter = "hue-rotate(0deg) saturate(0.2) brightness(0.9)";
    grid.style.boxShadow = "0 0 20px red";
    showTemporaryMessage(`Game Over! Final score:${score}`, "white", 3000);

    setTimeout(() => {
      level = 0;
      grid.style.filter = "";
      grid.style.boxShadow = "";
      playerPosition = 40;
      score = 0;
      createBoard();
    }, 3000);
  }

  createBoard();

  animationId = requestAnimationFrame(gameLoop);

  return function cleanup() {
    cancelAnimationFrame(animationId);
    gameRunning = false;
  };
}
