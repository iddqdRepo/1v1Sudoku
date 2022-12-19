import React, { useEffect, useState, useContext } from "react";
import "../styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { parse } from "query-string";
import { prod } from "../prod";
import { SocketContext } from "../context";

// const socket = io.connect(prod ? "https://sudoku-vercel-test-zkh1.vercel.app" : "http://localhost:5000");

//^ Square locations to highlight based on where the player clicks
let sudokuBoxOnClickHighlighting = [
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


const SudokuBoard = (props) => {
  const socket = useContext(SocketContext)
  const location = useLocation();
  //^ Messages shown to player, default "GO!"
  const [messageAlerts, setmessageAlerts] = React.useState("GO!");

  //^ Deep copy of board object
  let [board, setBoard] = useState(JSON.parse(JSON.stringify(location.state.detail.sudokuBoard)));
  let [user, setUser] = useState(JSON.parse(JSON.stringify(location.state.detail.currentUser)));
  //^ Deep copy of puzzle board
  let [playingBoard, setplayingBoard] = useState(JSON.parse(JSON.stringify([...location.state.detail.sudokuBoard.puzzle])));

  let [difficulty, setdifficulty] = useState(location.state.detail.sudokuBoard.difficulty);
  let [finishedBoard, setfinishedBoard] = useState(location.state.detail.sudokuBoard.solvedPuzzle);
  let [highlighted, sethighlighted] = useState([]);
  let [noting, setNoting] = useState(false);
  let copyBoard;
  let [notingObj, setNotingObj] = useState({});
  let [shiftNoting, setshiftNoting] = useState(false);


  //^ Alert the user when they try to reresh the page
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  // window.onbeforeunload = (event) => {
  //   const e = event || window.event;
  //   // Cancel the event
  //   e.preventDefault();
  //   if (e) {
  //     e.returnValue = ""; // Legacy method for cross browser support
  //   }
  //   return ""; // Legacy method for cross browser support
  // };

  // useEffect(() => {
  //   setTimeout(() => setCounter(counter + 1), 1000);
  // }, [counter]);

  //^check if board is correct logic
  let checkFinish = () => {

    if (JSON.stringify(playingBoard) === JSON.stringify(board.solvedPuzzle)) {
      socket.emit("end_game", user.name, (error) => {
        //! Check if error is being sent
        if (error) return console.log("ERROR FINISHING GAME");
      });
      return ;
    } else {
      setmessageAlerts("Board not correct");
    }
  };

  let updateBoard = (enteredValue, row, cell) => {
    copyBoard = [...playingBoard];
    enteredValue = parseInt(enteredValue.target.value);

    if (Number.isInteger(enteredValue)) {
      copyBoard[row][cell] = enteredValue;
    } else if (enteredValue === "") {
      copyBoard[row][cell] = 0;
    } else {
      copyBoard[row][cell] = 0;
    }

    setplayingBoard([...copyBoard]);
  };

  let clickHighlight = (clickedCell, row, cell) => {
    let colsToHilight = [];
    let rowToHilight = [];
    let fullHighlight = [];
    let squareToHiglight = [];
    let cellsToHilight = [];
    let numberClicked = clickedCell.target.value;

    //^square to highlight loop
    sudokuBoxOnClickHighlighting.map((k) => {
      if (k.includes(row.toString() + cell.toString())) {
        squareToHiglight = k;
        return;
      }
    });


    //^columns to highlight loop
    for (let i = 0; i < 9; i++) {
      colsToHilight.push(i.toString() + cell);
    }

    //^rows to highlight loop
    for (let i = 0; i < 9; i++) {
      rowToHilight.push(row + i.toString());
    }

    //^ Individual numbers to highlight
    //! Bit inefficient at O N Squared, but only called when a number is selected, not an empty cell, and it's a small board
    if (numberClicked) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (playingBoard[i][j].toString() === numberClicked) {
            cellsToHilight.push(i.toString() + j.toString());
          }
        }
      }
    }

    fullHighlight = [...colsToHilight, ...rowToHilight, ...squareToHiglight, ...cellsToHilight];
    sethighlighted(fullHighlight);
  };

  const isNoting = () => {
    setNoting(!noting);
    setshiftNoting(!shiftNoting);
  };

 
//^ Enable noting on "Enter" key pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setshiftNoting(!shiftNoting);
      setNoting(!noting);
    }
  };


  const fillBoard = () => {
    setplayingBoard([...finishedBoard]);
  };

  return (
    <>
    
      <div className="body" id="sudoku">
        <div className="card game" id="hello">
          <table id="puzzle-grid">
            {playingBoard.map((value, key, map) => {
              return (
                //^ Map over the table rows and add in the td cells
                //^ if cell is non clue sudoku cell then don't fill
                //^ if it's in the "highlighted" array, then add id highlighted
                <tbody key={"row" + key}>
                  <tr>
                    {playingBoard[key].map((v, k) => {
                      return v !== 0 ? (
                        //^ Cell is clue cell
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          <input
                            id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                            type="text"
                            autoComplete="off"
                            maxLength="1"
                            defaultValue={v.toString()}
                            onClick={(e) => {
                              clickHighlight(e, key, k);
                            }}
                            onBlur={(e) => {
                              updateBoard(e, key, k);
                            }}
                          />
                        </td>
                      ) : (
                        //^ Cell is non clue cell
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          {noting ? (
                            //^ noting is true
                            <>
                              <input
                                id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                                className="noting"
                                type="text"
                                autoComplete="off"
                                maxLength="5"
                                disabled={false}
                                defaultValue={notingObj.hasOwnProperty(key.toString() + k.toString()) ? notingObj[key.toString() + k.toString()] : ""}
                                placeholder={notingObj.hasOwnProperty(key.toString() + k.toString()) ? notingObj[key.toString() + k.toString()] : ""}
                                onInput={(e) => {
                                  if (e.target.value === "") {
                                    const copyOfObject = { ...notingObj };
                                    delete copyOfObject[key.toString() + k.toString()];
                                    setNotingObj({
                                      ...copyOfObject,
                                    });
                                  }
                                }}
                                onKeyPress={(e) => {
                                  handleKeyPress(e);
                                  if (e.target.value !== "") {
                                    let cell = key.toString() + k.toString();
                                    let updateobj = {};
                                    updateobj[cell] = e.target.value;
                                    setNotingObj({ ...notingObj, ...updateobj });
                                  }
                                }}
                                onBlur={(e) => {
                                  if (e.target.value !== "") {
                                    let cell = key.toString() + k.toString();
                                    let updateobj = {};
                                    updateobj[cell] = e.target.value;
                                    setNotingObj({ ...notingObj, ...updateobj });
                                  }
                                }}
                              />
                            </>
                          ) : //^ noting is false
                          //^ Cell is present as key in the noting object
                          notingObj.hasOwnProperty(key.toString() + k.toString()) ? (
                            <input
                              className={!notingObj.hasOwnProperty(key.toString() + k.toString()) ? "noting" : ""}
                              key={""}
                              id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                              type="text"
                              autoComplete="off"
                              maxLength="1"
                              disabled={false}
                              placeholder={notingObj[key.toString() + k.toString()]}
                              onKeyPress={(e) => {
                                handleKeyPress(e);
                              }}
                              onClick={(e) => {
                                clickHighlight(e, key, k);
                              }}
                              onBlur={(e) => {
                                updateBoard(e, key, k);
                              }}
                            />
                          ) : (
                            //^ Cell is NOT present as key in the noting object
                            <input
                              key={notingObj[key.toString() + k.toString()]}
                              id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                              type="text"
                              autoComplete="off"
                              maxLength="1"
                              disabled={false}
                              onKeyPress={(e) => {
                                handleKeyPress(e);
                              }}
                              onClick={(e) => {
                                clickHighlight(e, key, k);
                              }}
                              onBlur={(e) => {
                                updateBoard(e, key, k);
                                if (notingObj.hasOwnProperty(key.toString() + k.toString())) {
                                  const copyOfObject = { ...notingObj };
                                  delete copyOfObject[key.toString() + k.toString()];
                                  setNotingObj({
                                    ...copyOfObject,
                                  });
                                }
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
                <i className="fas fa-clipboard"></i>
                <span id="timer-label">&nbsp; Noting</span>
              </div>
              <div className="ondisplay">
                <div className="slideThree">
                  <input type="checkbox" value="None" id="slideThree" name="check" checked={shiftNoting ? true : false} onChange={() => isNoting()} />
                  <label htmlFor="slideThree"></label>
                </div>
              </div>
              <span className="noting-instruction">or select cell and press Enter</span>
            </li>

            <li>
              <div className="vertical-adjust">
                <i className="fas fa-angle-double-up"></i>
                <span id="game-difficulty-label">&nbsp; Game difficulty</span>
              </div>
              <div id="game-difficulty" className="timer">
                {difficulty}
              </div>
            </li>
            <li>
              <div className="vertical-adjust">
                <i className="fas fa-check"></i>
                <span>&nbsp; Press when done</span>
                <button id="finished-button" className="timer main" onClick={() => checkFinish()}>
                  Finished
                </button>
              </div>
            </li>
            <li>
              <div className="vertical-adjust">
                <i className="fas fa-bell"></i>
                <span id="timer-label">&nbsp; Alert Messages</span>
              </div>
              <div id="timer" className="prompt-text">
                {messageAlerts}
              </div>
            </li>
            {/* <li>
              <button onClick={() => fillBoard()}></button>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SudokuBoard;
