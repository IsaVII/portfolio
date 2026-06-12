//WALLS:   y,w,x,z | a,b = side walls | c,d = top/bottom walls
// ) = bush |  ( = tree |  %  = left door |  ^ = top door | f = bottom door | s = right door
// * = diglett |  $ = butterfree | (space) = empty walkable area
// e = goal
export const TILE_CLASSES = {
  a: "left-wall",
  b: "right-wall",
  c: "top-wall",
  d: "bottom-wall",
  w: "top-right-wall",
  y: "top-left-wall",
  z: "bottom-right-wall",
  x: "bottom-left-wall",
  "%": "left-door",
  "^": "top-door",
  f: "bottom-door",
  s: "right-door",
  ")": "bush",
  "(": "tree",
  e: "goal",
};

// Chars that are enemies, not tiles (handled separately)
export const ENEMY_CHARS = { "*": "diglett", $: "butterfree" };

// Chars that block movement (used by hasSquareBlockingElements)
export const BLOCKING_CLASSES = new Set([
  "left-wall",
  "right-wall",
  "top-wall",
  "bottom-wall",
  "top-left-wall",
  "top-right-wall",
  "bottom-left-wall",
  "bottom-right-wall",
  "tree",
  "bush",
]);

export function isDoorChar(char) {
  return char === "%" || char === "^" || char === "f" || char === "s";
}

export function hasSquareBlockingElements(square) {
  return (
    !square.classList.contains("left-wall") &&
    !square.classList.contains("right-wall") &&
    !square.classList.contains("top-wall") &&
    !square.classList.contains("bottom-wall") &&
    !square.classList.contains("top-left-wall") &&
    !square.classList.contains("top-right-wall") &&
    !square.classList.contains("bottom-left-wall") &&
    !square.classList.contains("bottom-right-wall") &&
    !square.classList.contains("tree") &&
    !square.classList.contains("bush")
  );
}
