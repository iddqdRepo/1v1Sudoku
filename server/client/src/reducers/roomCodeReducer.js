// prettier-ignore
export default (state = {}, action) => {
    switch (action.type) {
        case "ROOM_ID":
          return action.payload
      default:
        return state;
    }
  }
