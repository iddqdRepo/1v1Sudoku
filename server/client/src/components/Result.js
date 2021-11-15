import { useHistory, useLocation } from "react-router";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");
// const socket = io.connect("https://sudoku1v1.herokuapp.com");
const WinnerLoser = (props) => {
  const location = useLocation();
  const winner = location.state.detail.winner;
  console.log("winner is", winner);

  return (
    <>
      {winner ? (
        <div className="CreateGamePageContainer">
          <div className="CodeText">YOU WIN!</div>
          <Link to="/">
            <button className="JoinCreateBtn">Home</button>
          </Link>
        </div>
      ) : (
        <div className="CreateGamePageContainer">
          <div className="CodeText">YOU LOSE!</div>
          <Link to="/">
            <button className="JoinCreateBtn">Home</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default WinnerLoser;
