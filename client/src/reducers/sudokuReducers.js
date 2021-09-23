// prettier-ignore
export default (sudokuReducers = [], action) => {
    switch (action.type) {
      case "FETCH_EASY":
        return action.payload;
      case "FETCH_MEDIUM":
        return action.payload;
      case "FETCH_TEST":
        return action.payload;
      default:
        return [];
    }
  }
