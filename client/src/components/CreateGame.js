import React from "react";
import { useSelector } from "react-redux";

function CreateGame() {
  let roomId = useSelector((state) => state.sudokuReducers);

  return (
    <div>
      <div className="CreateGamePageContainer">
        <div className="CodeText">Your Code is:</div>
        <div className="Code">{roomId}</div>
        <div className="Loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="Waiting">Waiting for other player to join</div>
      </div>
    </div>
  );
}

export default CreateGame;
