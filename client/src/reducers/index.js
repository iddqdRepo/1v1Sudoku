import { combineReducers } from "redux";
import sudokuReducer from "./sudokuReducer";

export default combineReducers({
  //all the individual reducers we have
  sudokuReducer,
});
