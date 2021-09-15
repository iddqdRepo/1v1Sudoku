import React from "react";
import "../styles.css";
import { useSelector } from "react-redux";

const SudokuBoard = () => {
  let sudokuBoardFromReducers = useSelector((state) => state.sudokuReducers);

  return !sudokuBoardFromReducers.length ? (
    <h1>Nothing yet m8</h1>
  ) : (
    <div className="body" id="sudoku">
      <div className="card game">
        <table id="puzzle-grid">
          <tbody>
            <tr>
              {sudokuBoardFromReducers[0].puzzle[0].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[1].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[2].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[3].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[4].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[5].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[6].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[7].map((cell) => {
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
              {sudokuBoardFromReducers[0].puzzle[8].map((cell) => {
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
  );
};

export default SudokuBoard;
