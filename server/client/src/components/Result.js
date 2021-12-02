import { useLocation } from "react-router";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { prod } from "../prod";
import { SocketContext } from "../context";

const WinnerLoser = (props) => {
  const url = (prod ? "https://sudoku1v1.herokuapp.com" : "http://localhost:3000")
  const socket = useContext(SocketContext)
  const location = useLocation();
  const winner = location.state.detail.winner;
  // let history = useHistory();

  console.log("winner is", winner);

// const returnToHome = () =>
// {
//   socket.off()
//   history.push({
//     pathname: `/`,
//   });
// }
// onClick={() => {returnToHome()}}
  return (
    <>
      {winner ? (
        <div className="CreateGamePageContainer">
          <div className="CodeText">YOU WIN!</div>
          <a href={url}>
            <button className="JoinCreateBtn" >Home</button>
          </a>
        </div>
      ) : (
        <div className="CreateGamePageContainer">
          <div className="CodeText">YOU LOSE!</div>
          <a href={url}>
            <button className="JoinCreateBtn" >Home</button>
          </a>
        </div>
      )}
    </>
  );
};

export default WinnerLoser;
