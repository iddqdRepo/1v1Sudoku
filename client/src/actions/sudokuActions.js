import * as api from "../api"; //we import everything from action as api

//ActionCreators are functions that return actions
//thunk allows us to add additional arrow function in here (async (dispatch))

export const getEasy = () => async (dispatch) => {
  //this is successfully using redux to pass/dispatch an action from our backend
  try {
    //first we're getting a response from the api, in the response we always have the data
    const { data } = await api.fetchEasyBoard(); //data = the posts from the server returned from axios.get in the api = all the posts from the localhost 5000 server
    let randomBoard = Math.floor(Math.random() * data.length);

    dispatch({ type: "FETCH_EASY", payload: data[randomBoard] });
  } catch (error) {
    console.log(error.message + " getEasy Failed (in actions/sudokuActions.js)");
  }
};

export const getMedium = () => async (dispatch) => {
  //this is successfully using redux to pass/dispatch an action from our backend
  try {
    //first we're getting a response from the api, in the response we always have the data
    const { data } = await api.fetchMediumBoard(); //data = the posts from the server returned from axios.get in the api = all the posts from the localhost 5000 server
    let randomBoard = Math.floor(Math.random() * data.length);

    console.log(`fetched medium, data is`);
    console.log(data[randomBoard]);
    dispatch({ type: "FETCH_MEDIUM", payload: data[randomBoard] });
  } catch (error) {
    console.log(error.message + " getMedium Failed (in actions/sudokuActions.js)");
  }
};

export const getTest = () => async (dispatch) => {
  //this is successfully using redux to pass/dispatch an action from our backend
  try {
    //first we're getting a response from the api, in the response we always have the data
    const { data } = await api.fetchTestBoard(); //data = the posts from the server returned from axios.get in the api = all the posts from the localhost 5000 server
    let randomBoard = Math.floor(Math.random() * data.length);

    // console.log(`fetched test, data is`);
    // console.log(data[randomBoard]);
    dispatch({ type: "FETCH_TEST", payload: data[randomBoard] });
  } catch (error) {
    console.log(error.message + " getTest Failed (in actions/sudokuActions.js)");
  }
};

export const getRoom = () => async (dispatch) => {
  //this is successfully using redux to pass/dispatch an action from our backend
  try {
    // console.log("FETCHING ROOM ID");
    let output = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      output += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const roomId = output;

    // console.log(`Random ID fetched, code: ` + output);
    dispatch({ type: "ROOM_ID", payload: roomId });
  } catch (error) {
    console.log(error.message + " (roomID Failed)");
  }
};

export const getAllUsers = () => async (dispatch) => {
  //this is successfully using redux to pass/dispatch an action from our backend
  try {
    console.log("FETCHING ALL USERS");
    const { data } = await api.fetchUsers();

    // console.log(`Random ID fetched, code: ` + output);
    dispatch({ type: "ALL_USERS", payload: data });
  } catch (error) {
    console.log(error.message + " (ALL_USERS Failed)");
  }
};
