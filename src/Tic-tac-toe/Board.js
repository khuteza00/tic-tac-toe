import React, { useState } from "react";
import Square from "./Square";
import StartScreen from "./StartScreen";
import "../App.css";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXTurn] = useState(true);
  const [isStarted, setIsStarted] = useState(false); 
  const [is, setIs] = useState(false);

  const clickSound = new Audio('/mixkit-arcade-game-jump-coin-216.wav');
  const winnerSound = new Audio('/mixkit-video-game-win-2016.wav');

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (i) => {
    if (!isWinner) {
      if (state[i] !== null) {
        return;
      }
      clickSound.play();
      const copyState = [...state];
      copyState[i] = isXturn ? "X" : "O";
      setState(copyState);
      setIsXTurn(!isXturn);
    } else {
      winnerSound.play();
      setIs(true);
    }
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIs(false);
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className="game-container">
      {isStarted ? (
        <div className="board-container">
          {is ? (
            <>
              <h2 className="winner-message" style={{ color: "green" }}>
                Player {isWinner} won the game!
              </h2>
              <button className="reset-button" onClick={handleReset}>
                Play Again
              </button>
            </>
          ) : (
            <>
              {isWinner ? (
                <h2 className="winner-message" style={{ color: "green" }}>
                  Player {isWinner} won the game!
                </h2>
              ) : (
                <h2 className="player-turn">
                  Player {isXturn ? "X" : "O"} please move
                </h2>
              )}
              <div className="board">
                <div className="board-row">
                  <Square onClick={() => handleClick(0)} value={state[0]} />
                  <Square onClick={() => handleClick(1)} value={state[1]} />
                  <Square onClick={() => handleClick(2)} value={state[2]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(3)} value={state[3]} />
                  <Square onClick={() => handleClick(4)} value={state[4]} />
                  <Square onClick={() => handleClick(5)} value={state[5]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(6)} value={state[6]} />
                  <Square onClick={() => handleClick(7)} value={state[7]} />
                  <Square onClick={() => handleClick(8)} value={state[8]} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <StartScreen onStart={handleStart} />
      )}
    </div>
  );
};

export default Board;
