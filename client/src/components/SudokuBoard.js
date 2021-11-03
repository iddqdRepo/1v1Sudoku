import React, { useEffect, useState } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");
let endGame = false;

//TODO - fix playingBoard - it needs to get the row and column to update from the return

//TODO - If the finished button is pressed
//? compare board to finished board
//? if it's correct > emit end_game (not yet set up in server) - have a socket on endGame to check if other person has ended the game too
//? end game on both screens, compare time and whoever has the lowest time, declare the winner, otherwise declare the loser
//? else - show "board incorrect"

const SudokuBoard = (props) => {
  const location = useLocation();
  let history = useHistory();
  // console.log(location.state.detail);
  const [counter, setCounter] = React.useState(0);
  // let board = useSelector((state) => state.sudokuReducers);
  // console.log("location.state.detail is: ", location.state.detail);
  // console.log("location.state.detail.solvedpuzzle is: ", location.state.detail.solvedPuzzle);
  // console.log("location.state.detail.puzzle is: ", location.state.detail.puzzle);
  //~ Deep copy of board object
  let [board, setBoard] = useState(JSON.parse(JSON.stringify(location.state.detail.sudokuBoard)));
  let [user, setUser] = useState(JSON.parse(JSON.stringify(location.state.detail.currentUser)));
  // console.log("Current user is ", user);
  //~ Deep copy of puzzle board
  let [playingBoard, setplayingBoard] = useState(JSON.parse(JSON.stringify([...location.state.detail.sudokuBoard.puzzle])));

  // let playingBoard = JSON.parse(JSON.stringify([...location.state.detail.puzzle]));

  let [difficulty, setdifficulty] = useState(location.state.detail.sudokuBoard.difficulty);
  let [finishedBoard, setfinishedBoard] = useState(location.state.detail.sudokuBoard.solvedPuzzle);
  let copyBoard;

  //~ Alert the user when they try to reresh the page
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  let checkFinish = () => {
    console.log("check finished");
    console.log("Current user", user.name);
    //~check if board is correct logic
    if (JSON.stringify(playingBoard) === JSON.stringify(board.solvedPuzzle)) {
      socket.emit("end_game", user.name, (error) => {
        //! Check if error is being sent
        if (error) return console.log("ERROR FINISHING GAME");
      });
      return console.log("SOLVED YO");
    } else {
      return console.log("Not solved");
    }
  };

  let updateBoard = (enteredValue, row, cell) => {
    // console.log("cell ", key);
    // console.log("entered value ", enteredValue.target.value);
    // console.log("playing board = ", playingBoard);
    // console.log("row", row, " cell", cell, "which contained", playingBoard[0][cell], " updated to ", enteredValue.target.value);
    copyBoard = [...playingBoard];
    console.log("copyboard is ", copyBoard);
    copyBoard[0][cell] = parseInt(enteredValue.target.value);
    setplayingBoard([...copyBoard]);

    // playingBoard = [...copyBoard];
    // console.log("playingBoard", playingBoard[0]);
    // console.log("board = ", board.puzzle[0]);
    // console.log("playingBoard = ", playingBoard[row]);
  };

  return (
    <>
      <div className="body" id="sudoku">
        <div className="card game">
          <table id="puzzle-grid">
            {board.puzzle.map((value, key, map) => {
              return (
                <tbody key={"row" + key}>
                  {/* {console.log("tbody value = ", value)} */}
                  {/* {console.log("tbody key = ", "row" + key)} */}
                  <tr>
                    {board.puzzle[key].map((v, k, m) => {
                      return v !== 0 ? (
                        <td key={key.toString() + k.toString()}>
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {/* {console.log("td value = ", v)}
                          {console.log("td key = ", k)} */}
                          <input className="00" type="text" maxLength="1" disabled={true} defaultValue={v} />
                        </td>
                      ) : (
                        <td key={key.toString() + k.toString()}>
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {/* {console.log("td value = ", v)}
                          {console.log("td key = ", k)} */}
                          <input
                            className="00"
                            type="text"
                            maxLength="1"
                            disabled={false}
                            defaultValue={""}
                            onInput={(e) => {
                              updateBoard(e, key, k);
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="card status">
          <ul className="game-status">
            <li>
              <div className="vertical-adjust">
                <i className="far fa-clock"></i>
                <span id="timer-label">Time</span>
              </div>
              <div id="timer" className="timer">
                {counter}
              </div>
            </li>

            <li>
              <div className="vertical-adjust">
                <i className="fas fa-angle-double-up"></i>
                <span id="game-difficulty-label">Game difficulty</span>
              </div>
              <div id="game-difficulty" className="timer">
                {difficulty}
              </div>
            </li>
            <li>
              <div className="vertical-adjust">
                <div>Press when done</div>
                <button id="finished-button" className="timer" onClick={() => checkFinish()}>
                  Finished
                </button>
              </div>
            </li>
            {/* <li>
               <div className="vertical-adjust">
                 <div id="finished-check" className="timer">
                   You made a mistake somewhere
                 </div>
               </div>
             </li> */}
          </ul>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="body" id="sudoku">
  //       <div className="card game">
  //         <table id="puzzle-grid">
  //           <tbody>
  //             <tr>
  //               {board.puzzle[0].map((value, key, map) => {
  //                 return value !== 0 ? (
  //                   <td>
  //                     {/* {console.log("cell : ", key, "value ", value)}
  //                     {console.log("map cell ", map[key])}
  //                     {console.log("board cell ", board.puzzle[0][key])} */}
  //                     {/* {console.log("row 0, cell ", board.puzzle[0][cell], "is ", key)} */}
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={value} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     {/* {console.log("cell : ", key, "value ", value)}
  //                     {console.log("map cell ", map[key])}
  //                     {console.log("board cell ", board.puzzle[0][key])} */}
  //                     {/* {console.log("value ", value, "key ", key, "map ", map)} */}
  //                     {/* {console.log(board.puzzle[0])} */}
  //                     <input
  //                       className="00"
  //                       type="text"
  //                       maxLength="1"
  //                       disabled={false}
  //                       defaultValue={""}
  //                       onInput={(e) => {
  //                         updateBoard(e, key);
  //                       }}
  //                     />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[1].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[2].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[3].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[4].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[5].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[6].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[7].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //           <tbody>
  //             <tr>
  //               {board.puzzle[8].map((cell) => {
  //                 return cell !== 0 ? (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
  //                   </td>
  //                 ) : (
  //                   <td>
  //                     <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>

  //       <div className="card status">
  //         <ul className="game-status">
  //           <li>
  //             <div className="vertical-adjust">
  //               <i className="far fa-clock"></i>
  //               <span id="timer-label">Time</span>
  //             </div>
  //             <div id="timer" className="timer">
  //               00:00
  //             </div>
  //           </li>

  //           <li>
  //             <div className="vertical-adjust">
  //               <i className="fas fa-angle-double-up"></i>
  //               <span id="game-difficulty-label">Game difficulty</span>
  //             </div>
  //             <div id="game-difficulty" className="timer">
  //               {difficulty}
  //             </div>
  //           </li>
  //           <li>
  //             <div className="vertical-adjust">
  //               <div>Press when done</div>
  //               <button id="finished-button" className="timer">
  //                 Finished
  //               </button>
  //             </div>
  //           </li>
  //           {/* <li>
  //             <div className="vertical-adjust">
  //               <div id="finished-check" className="timer">
  //                 You made a mistake somewhere
  //               </div>
  //             </div>
  //           </li> */}
  //         </ul>
  //       </div>
  //     </div>
  //     {/* <div className="FinishCheckContainer">
  //       <button className="FinishCheckBtn" onClick={checkFinish}>
  //         Finish
  //       </button>
  //     </div> */}
  //   </>
  // );
};

export default SudokuBoard;
