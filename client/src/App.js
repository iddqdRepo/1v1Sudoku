import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; //allows us to dispatch an action
import { useSelector } from "react-redux";
import { getEasy, getMedium } from "./actions/sudokuActions";

import SudokuBoard from "./components/SudokuBoard";
//TODO - Get sudoku board from DB, redux
//the dispatching works etc (/post/post.js)
//should the store retrieve a random easy sudoku, and use that as the payload? then I can get the id from that
//and fetch the same one for the other person? or just show them the same one.

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatching getMedium");
    dispatch(getMedium()); //dispatching the action from ./actions/posts - redux
  }, [dispatch]);

  return (
    <>
      <SudokuBoard />
    </>
  );
}

export default App;
