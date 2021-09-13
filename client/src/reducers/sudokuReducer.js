// prettier-ignore
export default (sudokuReducer = [], action) => {
    switch (action.type) {
      case "FETCH_EASY":
            return action.payload; //these are our easy sudoku
        case "FETCH_MEDIUM":
            return action.payload; //these are our medium sudoku
        default:
            return sudokuReducer;
    }
  }
