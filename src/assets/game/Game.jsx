import { useEffect } from "react";
import { initGame } from "./game.js";
import { icons } from "./../icons.jsx";

const Icon = ({ name }) => icons[name] ?? null;

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
        <div className="text lowerText">
          use arrow keys to move, SPACE to catch Pokémon
          <br />
          <div className="flex flex-row lowerText ">
            --- made with
            <span id="javascript-icon">
              <Icon name="Javascript" className="" />
            </span>{" "}
            ---
          </div>
        </div>
      </div>
    </>
  );
}
