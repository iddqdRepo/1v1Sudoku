import React, { useEffect, useState } from "react";
import "../styles.css";
import { useSelector } from "react-redux";

const SudokuBoard = (props) => {
  // let board = useSelector((state) => state.sudokuReducers);
  let [board, setBoard] = useState(props.board);
  let [finishedBoard, setfinishedBoard] = useState(props.board.solvedPuzzle);
  console.log("finishedBoard is:");
  console.log(finishedBoard);

  // useEffect(() => {
  //   console.log("in use effect");
  //   console.log(board);
  // }, [board]);
  // console.log(board);
  let checkFinish = () => {
    console.log("finished");
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
