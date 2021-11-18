import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import e from "cors";
import { parse } from "query-string";
// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://sudoku1v1.herokuapp.com");
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
  const [messageAlerts, setmessageAlerts] = React.useState("GO!");
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
  let [noting, setNoting] = useState(false);
  let [notingValue, setNotingValue] = useState();
  let [clickedCell, setclickedCell] = useState();
  let copyBoard;
  let [notingObj, setNotingObj] = useState({});
  let [shiftNoting, setshiftNoting] = useState(false);

  //~ Alert the user when they try to reresh the page
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     console.log("in here");
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
      setmessageAlerts("Board not correct");
    }
  };

  let updateBoard = (enteredValue, row, cell) => {
    // console.log("cell ", cell);
    // console.log("entered value ", enteredValue.target.value);
    // console.log("playing board = ", playingBoard);enteredValue
    // console.log("row", row, " cell", cell, "which contained", playingBoard[0][cell], " updated to ", .target.value);

    copyBoard = [...playingBoard];
    // console.log("Updateboard e.target.value is ", enteredValue.target.value);
    // console.log("Updateboard e.target.value is number", Number.isInteger(enteredValue.target.value));
    enteredValue = parseInt(enteredValue.target.value);

    if (Number.isInteger(enteredValue)) {
      copyBoard[row][cell] = enteredValue;
      console.log("Update board was integer");
    } else if (enteredValue === "") {
      console.log("Update board was blank");
      copyBoard[row][cell] = 0;
    } else {
      copyBoard[row][cell] = 0;
      console.log("Update board was else");
    }

    console.log("copyboard is ", copyBoard);
    setplayingBoard([...copyBoard]);
    // console.log("Update board complete");
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
    let cellsToHilight = [];
    let numberClicked = clickedCell.target.value;

    //^square loop
    sudokuBoxOnClickHighlighting.map((k) => {
      if (k.includes(row.toString() + cell.toString())) {
        squareToHiglight = k;
        // console.log("squareToHiglight =", squareToHiglight);
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

    //^ Individual numbers to highlight
    //! Bit inefficient at O N Squared, but only called when a number is selected, not an empty cell, and it's a small board
    if (numberClicked) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          // console.log(playingBoard[i][j]);
          if (playingBoard[i][j].toString() === numberClicked) {
            cellsToHilight.push(i.toString() + j.toString());
          }
        }
      }
    }
    // console.log("cells to highlight = ", cellsToHilight);
    // console.log("row needed to highlight are: ", rowToHilight);
    fullHighlight = [...colsToHilight, ...rowToHilight, ...squareToHiglight, ...cellsToHilight];
    // console.log(highlighted);
    sethighlighted(fullHighlight);
  };

  const isNoting = () => {
    setNoting(!noting);
    setshiftNoting(!shiftNoting);
  };

  const updateNote = (e) => {
    console.log("Updating note");
    setNotingValue(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setshiftNoting(!shiftNoting);
      setNoting(!noting);
    }
  };

  //! BUG - can't delete all notes, when the last number is deleted it defaults back to all

  return (
    <>
      <div className="body" id="sudoku">
        <div className="card game" id="hello">
          <table id="puzzle-grid">
            {playingBoard.map((value, key, map) => {
              // {
              //   console.log("notingObj = ", notingObj);
              // }
              return (
                //* Map over the table rows and add in the td cells
                //* if cell is non clue sudoku cell then don't fill
                //* if it's in the "highlighted" array, then add id highlighted
                <tbody key={"row" + key}>
                  <tr>
                    {playingBoard[key].map((v, k) => {
                      return v !== 0 ? (
                        //* Cell is clue cell
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          <input
                            id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                            type="text"
                            maxLength="1"
                            // readOnly
                            defaultValue={v.toString()}
                            onClick={(e) => {
                              clickHighlight(e, key, k);
                            }}
                            onBlur={(e) => {
                              updateBoard(e, key, k);
                            }}
                          />
                          {/* {console.log("td key = ", key.toString() + k.toString(), "VALUE: ", v)} */}
                        </td>
                      ) : (
                        //* Cell is non clue cell
                        // <td className={`${"td"} ${key.toString() + k.toString()}`} key={key.toString() + k.toString()}>
                        <td className={"td" + key.toString() + k.toString()} key={key.toString() + k.toString()}>
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {/* {console.log("td value = ", v)}*/}
                          {/* {console.log("td key = ", key.toString() + k.toString())} */}
                          {noting ? (
                            //* noting is true
                            // // ! If you type out a note then delete it, a number still remains
                            // // - trying to change the font size when typing to look more like noting style by changing the classname 16/11/21
                            //  // ! if you have entered a number and havent left the cell, and you click note, it instantly turns that value into a note, unfocus onclick?
                            <>
                              {/* {console.log("clicked cell is ", clickedCell)} */}
                              <input
                                id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                                // className={notingObj.hasOwnProperty(key.toString() + k.toString()) ? "noting" : ""}
                                className="noting"
                                type="text"
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
                                    console.log("noting true onBlur");
                                    let cell = key.toString() + k.toString();
                                    let updateobj = {};
                                    updateobj[cell] = e.target.value;
                                    setNotingObj({ ...notingObj, ...updateobj });
                                  }
                                }}
                                onClick={(e) => {
                                  console.log("onClick noting true");
                                  console.log("notingObj is ", notingObj);

                                  // setNotingValue(e.target.value);
                                  // console.log("off focus cell ", key.toString() + k.toString(), "notingValue ", notingValue);
                                }}
                                onBlur={(e) => {
                                  if (e.target.value !== "") {
                                    console.log("noting true onBlur");
                                    let cell = key.toString() + k.toString();
                                    let updateobj = {};
                                    updateobj[cell] = e.target.value;
                                    setNotingObj({ ...notingObj, ...updateobj });
                                  }
                                  // else {
                                  //   const copyOfObject = { ...notingObj };
                                  //   delete copyOfObject[key.toString() + k.toString()];
                                  //   setNotingObj({
                                  //     ...copyOfObject,
                                  //   });
                                  //   console.log("noting object deleted");
                                  // }
                                  // setNotingValue(e.target.value);
                                  // console.log("off focus cell ", key.toString() + k.toString(), "notingValue ", notingValue);
                                }}
                              />
                            </>
                          ) : //* noting is false
                          //* Cell is present as key in the noting object
                          notingObj.hasOwnProperty(key.toString() + k.toString()) ? (
                            <input
                              className={!notingObj.hasOwnProperty(key.toString() + k.toString()) ? "noting" : ""}
                              key={""}
                              id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                              type="text"
                              maxLength="1"
                              disabled={false}
                              placeholder={notingObj[key.toString() + k.toString()]}
                              onKeyPress={(e) => {
                                handleKeyPress(e);
                              }}
                              onClick={(e) => {
                                // console.log("clicked cell is: ", key.toString() + k.toString());

                                console.log("onClick noting false but cell IS in object noting list");
                                clickHighlight(e, key, k);
                              }}
                              onBlur={(e) => {
                                console.log("e is: ", e);
                                updateBoard(e, key, k);
                                console.log("row", key, " cell", k, "which contained", playingBoard[key][k], " updated to ", e.target.value);
                              }}
                            />
                          ) : (
                            //* Cell is NOT present as key in the noting object
                            <input
                              key={notingObj[key.toString() + k.toString()]}
                              id={highlighted.includes(key.toString() + k.toString()) ? "highlight" : ""}
                              // className={"noting" ? "yes" : "no"}
                              type="text"
                              maxLength="1"
                              disabled={false}
                              // defaultValue={newValue ? newValue : ""}
                              // placeholder="he"
                              onKeyPress={(e) => {
                                handleKeyPress(e);
                              }}
                              onInput={(e) => {
                                // updateBoard(e, key, k);
                                // console.log("row", key, " cell", k, "which contained", playingBoard[key][k], " updated to ", e.target.value);
                              }}
                              onClick={(e) => {
                                // console.log("clicked cell is: ", key.toString() + k.toString(), e.target.value);
                                // console.log("Cell NOT in object noting list");
                                console.log("onClick noting false but cell is NOT in object noting list");

                                clickHighlight(e, key, k);
                              }}
                              onBlur={(e) => {
                                if (e.target.value === "") {
                                  console.log("e.target.value is blank, triggered when deleted??");
                                }
                                updateBoard(e, key, k);
                                console.log("e.target.value is ", e.target.value);
                                if (notingObj.hasOwnProperty(key.toString() + k.toString())) {
                                  const copyOfObject = { ...notingObj };
                                  delete copyOfObject[key.toString() + k.toString()];
                                  setNotingObj({
                                    ...copyOfObject,
                                  });
                                  console.log("noting object deleted");
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default SudokuBoard;
