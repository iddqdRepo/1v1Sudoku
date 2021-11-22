// prettier-ignore
export default (state = {}, action) => {
    switch (action.type) {
        case "ALL_USERS":
          return action.payload
      default:
        return state;
    }
  }
