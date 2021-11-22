import { combineReducers } from "redux";
import sudokuReducers from "./sudokuReducers";
import roomCodeReducer from "./roomCodeReducer";
import allUserDataReducer from "./allUserDataReducer";

export default combineReducers({
  //all the individual reducers we have
  sudokuReducers,
  roomCodeReducer,
  allUserDataReducer,
});
