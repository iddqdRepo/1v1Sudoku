import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/sudokuActions";
function CreateGame() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  let roomId = useSelector((state) => state.roomCodeReducer);
  // let roomId = "creategame";

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
