// prettier-ignore
// const initialState = {

// }

export default (state = {}, action) => {
    switch (action.type) {
      case "FETCH_EASY":
        return action.payload;
      case "FETCH_MEDIUM":
        return action.payload;
      case "FETCH_TEST":
        return action.payload;
      default:
        return state;
    }
  }
