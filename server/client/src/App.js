import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SudokuBoard from "./components/SudokuBoard";
import Homepage from "./components/Homepage";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Result from "./components/Result";
import {SocketContext, socket} from "./context"


function App() {

  return (
    <>
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/create" exact component={CreateGame}></Route>
          <Route path="/join" exact component={JoinGame}></Route>
          <Route path="/result" exact component={Result}></Route>
          <Route path="/sudoku">
            <SudokuBoard />
          </Route>
        </Switch>
      </Router>
      </SocketContext.Provider>
    </>
  );
}

export default App;
