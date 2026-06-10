import { useEffect } from "react";
import { initGame } from "./app.js";

export default function ZeldaGame() {
  useEffect(() => {
    const cleanup = initGame();
    return cleanup;
  }, []);
  return (
    <>
      <div className="game">
        <div className="ui">
          <p>
            Score: <span id="score">0 </span>
          </p>
          <p>
            Level: <span id="level">1 </span>
          </p>
          <p>
            Enemies: <span id="enemies">2 </span>
          </p>
        </div>

        <div id="grid"></div>
        <div className="text">use arrow keys to move, SPACE to attack</div>
      </div>
    </>
  );
}
