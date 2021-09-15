import { combineReducers } from "redux";
import sudokuReducers from "./sudokuReducers";

export default combineReducers({
  //all the individual reducers we have
  sudokuReducers,
});
