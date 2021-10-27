import React, { useEffect, useState } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SudokuBoard = (props) => {
  const location = useLocation();
  // let board = useSelector((state) => state.sudokuReducers);
  // console.log("location.state.detail is: ", location.state.detail);
  // console.log("location.state.detail.solvedpuzzle is: ", location.state.detail.solvedPuzzle);
  // console.log("location.state.detail.puzzle is: ", location.state.detail.puzzle);
  let [board, setBoard] = useState(location.state.detail);
  let [finishedBoard, setfinishedBoard] = useState(location.state.detail.solvedPuzzle);
  console.log("finishedBoard is:");
  console.log(finishedBoard);

  // useEffect(() => {
  //   console.log("in use effect");
  //   console.log(board);
  // }, [board]);
  // console.log(board);

  let checkFinish = () => {
    console.log("check finished");
  };

  return (
    <>
      <div id="sudoku">
        <div className="card game">
          <table id="puzzle-grid">
            <tbody>
              <tr>
                {board.puzzle[0].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[1].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[2].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[3].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[4].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[5].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[6].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[7].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                {board.puzzle[8].map((cell) => {
                  return cell !== 0 ? (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={true} defaultValue={cell} />
                    </td>
                  ) : (
                    <td>
                      <input className="00" type="text" maxLength="1" disabled={false} defaultValue={""} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="FinishCheckContainer">
        <button className="FinishCheckBtn" onClick={checkFinish}>
          Finish
        </button>
      </div>
    </>
  );
};

export default SudokuBoard;
