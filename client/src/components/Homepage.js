import React from "react";
import { useHistory } from "react-router-dom";

function Homepage() {
  let history = useHistory();

  let startGame = () => {
    history.push("/sudoku");
  };

  return (
    <div className="HomepageContainer">
      <div className="CreateGameContainer">
        <button className="JoinCreateBtn">Create Game</button>
      </div>
      <div className="TestStartGameCreateGameContainer">
        <button className="JoinCreateBtn">Start Game</button>
      </div>
      <div className="JoinGameContainer">
        <button className="JoinCreateBtn">Join Game</button>
        <input className="JoinGameInput" Value="Enter game code"></input>
      </div>
    </div>
  );
}

export default Homepage;
