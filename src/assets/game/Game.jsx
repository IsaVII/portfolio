import { useEffect } from "react";
import { initGame } from "./game.js";

export default function Game() {
  useEffect(() => {
    const cleanup = initGame();
    return cleanup;
  }, []);
  return (
    <>
      <div className="game">
        <div className="ui">
          <p>
            Pokémon:{" "}
            <span id="score">
              <b>0</b>
            </span>
          </p>
          <p>
            Level:{" "}
            <span id="level">
              <b>1</b>
            </span>
          </p>
          <p>
            Wild Pokémon:{" "}
            <span id="enemies">
              <b>2</b>
            </span>
          </p>
        </div>

        <div id="grid"></div>
        <div className="text">
          use arrow keys to move, SPACE to catch Pokémon
        </div>
      </div>
    </>
  );
}
