import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEasy, getMedium, getTest } from "./actions/sudokuActions";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SudokuBoard from "./components/SudokuBoard";
import Homepage from "./components/Homepage";
import CreateGame from "./components/CreateGame";

const socket = io.connect("http://localhost:5000");

socket.on("message", (message) => {
  console.log(message);
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatching getTest");
    dispatch(getTest()); //dispatching the action from ./actions/posts - redux
  }, [dispatch]);

  let sudokuBoardFromReducers = useSelector((state) => state.sudokuReducers);
  // console.log("sudokuBoardFromReducers");
  // console.log(sudokuBoardFromReducers);

  return Array.isArray(sudokuBoardFromReducers) ? (
    <>
      <div className="Loading-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  ) : (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
            {/* <SudokuBoard board={sudokuBoardFromReducers} /> */}
          </Route>
          <Route path="/play" exact component={CreateGame}></Route>

          <Route path="/sudoku">
            {console.log(sudokuBoardFromReducers)}
            <SudokuBoard board={sudokuBoardFromReducers} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
