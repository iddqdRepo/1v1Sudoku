import React from "react";

function CreateGame() {
  return (
    <div>
      <div className="CreateGamePageContainer">
        <div className="CodeText">Your Code is:</div>
        <div className="Code">12Qus12</div>
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
