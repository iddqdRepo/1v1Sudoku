import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getEasy, getMedium, getTest } from "../actions/sudokuActions";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { prod } from "../prod";

const socket = io.connect(prod ? "https://sudoku1v1.herokuapp.com" : "http://localhost:5000");

let movedToGame = false;
let currentUser = {};

function CreateGame() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]);
  // const [currentUser, setCurrentUser] = useState([]);
  // const [chosenDifficulty, setChosenDifficulty] = useState("")
  let chosenDifficulty = location.state.detail;
  // let allUsersTestCheck = useSelector((state) => state.allUserDataReducer);
  let roomId = useSelector((state) => state.roomCodeReducer);
  let history = useHistory();
  let sudokuBoard = useSelector((state) => state.sudokuReducers);
  console.log("SUDOKU BOARD IS: ", sudokuBoard);

  useEffect(() => {
    console.log("User close difficulty: ", chosenDifficulty);
    dispatch(getAllUsers());
    if (chosenDifficulty === "easy") {
      console.log("CHOSEN DIFFICULTY IS EASY - DISPATCHING EASY");
      dispatch(getEasy());
    } else if (chosenDifficulty === "medium") {
      console.log("CHOSEN DIFFICULTY IS MEDIUM - DISPATCHING MEDIUM");
      dispatch(getMedium());
    } else if (chosenDifficulty === "test") {
      dispatch(getTest());
    }
  }, [dispatch]);

  useEffect(() => {
    socket.emit("join_room", { room: roomId }, (error) => {
      if (error) console.log("ERROR CREATING ROOM");
    });

    return function cleanup() {
      if (!movedToGame) {
        //shut down connnection instance
        socket.off();
      }
    };
  }, []);

  const alertUser = (e) => {
    console.log("createGame alertUser");
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    console.log("----- CREATEGAME USE EFFECT CALL ----------");
    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (UserRoomData) => {
      console.log("socket.on(roomData - creategame");
      setRoomAndUsersInRoom(UserRoomData);
      // console.log("UserRoomData : ", UserRoomData);
    });

    socket.on("currentUserData", (currUser) => {
      // setCurrentUser(currUser);
      currentUser = currUser;
      console.log("socket.on(currentUserData - creategame - user is ", currentUser);
      // nonStateSetCurrentUser = currUser;
    });

    socket.on("message", (msg) => {
      console.log("socket.on(message - creategame ", msg);
      // setCurrentUser(currUser);
      // console.log("message = ", msg);
    });
  }, []);

  useEffect(() => {
    socket.on("endgameemit", (payload) => {
      // console.log("socket.on(end_game_emit - SudokuBoard");
      // console.log(payload, " has won");
      // console.log("currentUser is: ", currentUser.name);
      if (payload === currentUser.name) {
        console.log("Disconnect?");
        // socket.disconnect();
        socket.off()
        history.push({
          pathname: `/result`,
          search: `?Winner`,
          state: {
            detail: { winner: true },
          },
        });
      } else {
        console.log("Disconnect?");
        // socket.disconnect();
        socket.off()
        history.push({
          pathname: `/result`,
          search: `?Loser`,
          state: {
            detail: { winner: false },
          },
        });
      }
      // if (error) return console.log("ERROR FINISHING GAME");
    });
  }, []);

  // console.log("CreateRoom setUsersRooms is ", roomAndUsersInRoom);
  // console.log("CreateRoom current user is ", currentUser);

  let checkAllUser = () => {
    // console.log("-----TESTING-----");
    // console.log("users: ", roomAndUsersInRoom);
    // console.log("Current User: ", currentUser);
    //TODO Make it dispatch and check the contents of the room from the store
    let countUsersInRoom = roomAndUsersInRoom.users.length;
    let userusers = countUsersInRoom < 2 ? "user" : "users";
    console.log(roomAndUsersInRoom.room, "has ", countUsersInRoom, userusers, " in it");
  };

  let startGame = () => {
    console.log("-----START GAME-----");
    movedToGame = true;
    // console.log("users: ", roomAndUsersInRoom);
    // console.log("Current User: ", currentUser);
    //TODO Make it dispatch and check the contents of the room from the store
    let countUsersInRoom = roomAndUsersInRoom.users.length;
    // console.log(roomAndUsersInRoom.room, "has ", countUsersInRoom, "users in it");

    socket.emit("start_game", sudokuBoard, (error) => {
      console.log("EMIT START_GAME " + roomId, " - creategame");
      if (error) return console.log("ERROR STARTING GAME");
    });
    // history.push();
    history.push({
      pathname: `/sudoku`,
      search: `?roomCode=${roomId}`,
      state: {
        detail: { sudokuBoard, currentUser },
      },
    });
  };

  // let roomId = "creategame";
  return roomAndUsersInRoom.users === undefined ? (
    <>
      <div className="Loading-ring">
        {/* {(console.log("sudoku board is"), sudokuBoardFromReducers)} */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  ) : roomAndUsersInRoom.users.length < 2 ? (
    <div className="CreateGamePageContainer">
      <div className="CodeText">Your Code is:</div>
      <div className="Code">{roomId}</div>
      <div className="Loading-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <button className="JoinCreateBtn" onClick={() => checkAllUser()}>
        Check users in room
      </button> */}
      <div className="Waiting">Waiting for other player to join</div>
      <div className="Waiting-description">Tell your opponent to enter the code above press 'Join Game'</div>
    </div>
  ) : (
    <div>
      <div className="CreateGamePageContainer">
        <div className="CodeText">Player 2 has joined </div>
        <div className="Code">Start the game when you're ready</div>
        <div className="Waiting"></div>
        <button className="JoinCreateBtn" onClick={() => startGame()}>
          Start Game
        </button>

        <div className="Waiting-description">Press "Start Game" when you are ready</div>
      </div>
    </div>
  );
}

export default CreateGame;
