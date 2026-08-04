import { maps } from "./maps/maps.js";
import { TILE_CLASSES, ENEMY_CHARS, isDoorChar } from "./maps/mapElements.js";
import { createEnemy } from "./enemies/enemies.js";

export function createMapController({ grid, width, tileSize }) {
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

  function createBoard(
    currentMapId,
    setPlayerPosition,
    setPlayerDirection,
    enemies,
    onEnemiesCreated,
  ) {
    grid.innerHTML = "";
    const squares = [];
    enemies.length = 0;

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

        addMapElement(
          square,
          char,
          j,
          i,
          state.enemiesCleared,
          currentMapId,
          enemies,
          grid,
        );

        grid.appendChild(square);
        squares.push(square);
      }
    }

    onEnemiesCreated(enemies, squares);
    return squares;
  }

  function addMapElement(
    square,
    char,
    x,
    y,
    enemiesCleared,
    currentMapId,
    enemies,
    grid,
  ) {
    if (TILE_CLASSES[char]) {
      square.classList.add(TILE_CLASSES[char]);
    } else if (ENEMY_CHARS[char]) {
      if (!enemiesCleared) {
        const enemy = createEnemy(ENEMY_CHARS[char], x, y, grid);
        enemies.push(enemy);
      }
    }

    // space = walkable, no class needed
  }

  function switchMap(
    nextMapId,
    direction,
    setCurrentMapId,
    setPlayerPosition,
    setPlayerDirection,
    createPlayer,
    createBoardCallback,
    resetEnemies,
  ) {
    setCurrentMapId(nextMapId);
    const targetMap = getMapById(nextMapId);

    switch (direction) {
      case "door-t":
        setPlayerDirection("up");
        break;
      case "door-b":
        setPlayerDirection("down");
        break;
      case "door-l":
        setPlayerDirection("left");
        break;
      case "door-r":
        setPlayerDirection("right");
        break;
      default:
        setPlayerDirection("down");
    }

    let startPos = targetMap.doorsFrom[direction]
      ? targetMap.doorsFrom[direction]
      : 41;
    setPlayerPosition(startPos);

    createBoardCallback();
  }

  function resetMapStates() {
    for (const key in mapStates) {
      delete mapStates[key];
    }
  }

  return {
    getMapById,
    initMapState,
    createBoard,
    addMapElement,
    switchMap,
    resetMapStates,
  };
}
