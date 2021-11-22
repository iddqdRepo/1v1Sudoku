import React from "react";
import { useDispatch } from "react-redux";
// import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SudokuBoard from "./components/SudokuBoard";
import Homepage from "./components/Homepage";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Result from "./components/Result";

// const socket = io.connect("http://localhost:5000");

// socket.on("message", (message) => {
//   console.log(message);
// });

function App() {
  // const dispatch = useDispatch();

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/create" exact component={CreateGame}></Route>
          <Route path="/join" exact component={JoinGame}></Route>
          <Route path="/result" exact component={Result}></Route>
          {/* <Route path="/loser" exact component={Result}></Route> */}
          <Route path="/sudoku">
            <SudokuBoard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
