import React, { useEffect, useState } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");
let totalSquares = [
  ["00", "01", "02", "10", "11", "12", "20", "21", "22"],

  ["03", "04", "05", "13", "14", "15", "23", "24", "25"],

  ["06", "07", "08", "16", "17", "18", "26", "27", "28"],

  ["30", "31", "32", "40", "41", "42", "50", "51", "52"],

  ["33", "34", "35", "43", "44", "45", "53", "54", "55"],

  ["36", "37", "38", "46", "47", "48", "56", "57", "58"],

  ["60", "61", "62", "70", "71", "72", "80", "81", "82"],

  ["63", "64", "65", "73", "74", "75", "83", "84", "85"],

  ["66", "67", "68", "76", "77", "78", "86", "87", "88"],
];
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
  let [highlighted, sethighlighted] = useState([]);
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

  // useEffect(() => {
  //   setTimeout(() => setCounter(counter + 1), 1000);
  // }, [counter]);

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

  let clickHighlight = (clickedCell, row, cell) => {
    let colsToHilight = [];
    let rowToHilight = [];
    let fullHighlight = [];
    let squareToHiglight = [];
    //? UseRef????
    //for cell 40 i need cells:
    //rows = 00 10 20 30 40 50 60 70 80
    //cols = 40 41 42 43 44 45 46 47 48
    //square = object
    console.log("clickedCell row cell =", row.toString() + cell.toString());

    totalSquares.map((k) => {
      if (k.includes(row.toString() + cell.toString())) {
        squareToHiglight = k;
        console.log("squareToHiglight =", squareToHiglight);
        return;
      }
    });

    //highlighted

    //^columns loop
    for (let i = 0; i < 9; i++) {
      colsToHilight.push(i.toString() + cell);
    }
    // console.log("cols needed to highlight are: ", colsToHilight);

    //^rows loop
    for (let i = 0; i < 9; i++) {
      rowToHilight.push(row + i.toString());
    }
    // console.log("row needed to highlight are: ", rowToHilight);
    fullHighlight = [...colsToHilight, ...rowToHilight, ...squareToHiglight];
    // console.log(highlighted);
    sethighlighted(fullHighlight);

    //^square loop
    //&
    // for (let i = 0; i < 9; i++) {
    //   squareToHiglight.push(row + i.toString());
    // }
    // console.log("square needed to highlight are: ", squareToHiglight);

    // console.log("rows needed to highlight are: ", )

    // let cellw = (row.toString() + cell.toString()).toString();
    // console.log("cellw ", cellw);
    // sethighlighted([...highlighted, cellw]);
    // console.log(highlighted);

    // clickedCell.target.parentElement.childElements  = { backgroundColor: "red" };
    // console.log(clickedCell.target.parentElement.parentElement.parentElement.parentElement);
    // console.log(clickedCell.target.parentElement.className);
  };

  //TODO - add in highlighting row/col/chunk when cell is selected
  //? highlight input based on highlighted usestate
  return (
    <>
      <div className="body" id="sudoku">
        <div className="card game" id="hello">
          <table id="puzzle-grid">
            {board.puzzle.map((value, key, map) => {
              return (
                <tbody key={"row" + key}>
                  {/* {console.log("tbody value = ", value)} */}
                  {/* {console.log("tbody key = ", "row" + key)} */}
                  <tr>
                    {board.puzzle[key].map((v, k, m) => {
                      return v !== 0 ? (
                        // <td className={`${"td"} ${key.toString() + k.toString()} `} key={key.toString() + k.toString()}>
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {/* {console.log("td value = ", v)}
                          {console.log("td key = ", k)} */}
                          {highlighted.includes(key.toString() + k.toString()) ? (
                            <input className="00" type="text" maxLength="1" disabled={true} defaultValue={v} id="highlight" />
                          ) : (
                            <input className="00" type="text" maxLength="1" disabled={true} defaultValue={v} />
                          )}

                          {/* {console.log("td key = ", key.toString() + k.toString(), "VALUE: ", v)} */}
                        </td>
                      ) : (
                        // <td className={`${"td"} ${key.toString() + k.toString()}`} key={key.toString() + k.toString()}>
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {/* {console.log("td value = ", v)}*/}
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}

                          {highlighted.includes(key.toString() + k.toString()) ? (
                            <input
                              id="highlight"
                              className="00"
                              type="text"
                              maxLength="1"
                              disabled={false}
                              defaultValue={""}
                              onInput={(e) => {
                                updateBoard(e, key, k);
                              }}
                              onClick={(e) => {
                                clickHighlight(e, key, k);
                              }}
                            />
                          ) : (
                            <input
                              // id="highlight"
                              className="00"
                              type="text"
                              maxLength="1"
                              disabled={false}
                              defaultValue={""}
                              onInput={(e) => {
                                updateBoard(e, key, k);
                              }}
                              onClick={(e) => {
                                clickHighlight(e, key, k);
                              }}
                            />
                          )}
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
