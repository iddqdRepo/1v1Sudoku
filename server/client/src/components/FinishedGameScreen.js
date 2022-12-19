import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getEasy, getMedium } from "../actions/sudokuActions";
import { useHistory, Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { prod } from "../prod";

const socket = io.connect(prod ? "https://sudoku-vercel-test-zkh1.vercel.app" : "http://localhost:5000");
// const socket = io.connect("https://sudoku-vercel-test-zkh1.vercel.app");
let movedToGame = false;

function CreateGame() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  // const [chosenDifficulty, setChosenDifficulty] = useState("")
  let chosenDifficulty = location.state.detail;
  let allUsersTestCheck = useSelector((state) => state.allUserDataReducer);
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
    }
    // else if(chosenDifficulty === "hard"){
    //   dispatch(getHard());
    // }

    // console.log("----- USE EFFECT CALL GET ALL USERS IN CREATEGAME ----------");
  }, [dispatch]);

  useEffect(() => {
    console.log("----- CREATEGAME JOIN ROOM USE EFFECT CALL ----------");
    socket.emit("join_room", { room: roomId }, (error) => {
      console.log("emit joinroom name," + roomId);
      if (error) console.log("ERROR CREATING ROOM");
    });

    //TODO - Remove from the list when user disconnects from creategame
    return function cleanup() {
      // socket.disconnect(); --- this causes the can't create room again error
      console.log("MOVED TO GAME IS ", movedToGame);
      if (!movedToGame) {
        console.log("CLEANUP INITIATED");
        //shut down connnection instance
        socket.off();
      }
    };
  }, []);

  useEffect(() => {
    console.log("----- CREATEGAME USE EFFECT CALL ----------");
    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (UserRoomData) => {
      setRoomAndUsersInRoom(UserRoomData);
      // console.log("UserRoomData : ", UserRoomData);
    });

    socket.on("currentUserData", (currUser) => {
      setCurrentUser(currUser);
      // nonStateSetCurrentUser = currUser;
    });

    socket.on("message", (msg) => {
      // setCurrentUser(currUser);
      console.log("message = ", msg);
    });
  }, []);

  console.log("CreateRoom setUsersRooms is ", roomAndUsersInRoom);
  console.log("CreateRoom current user is ", currentUser);

  let checkAllUser = () => {
    console.log("-----TESTING-----");
    console.log("users: ", roomAndUsersInRoom);
    console.log("Current User: ", currentUser);
    //TODO Make it dispatch and check the contents of the room from the store
    let countUsersInRoom = roomAndUsersInRoom.users.length;
    let userusers = countUsersInRoom < 2 ? "user" : "users";
    console.log(roomAndUsersInRoom.room, "has ", countUsersInRoom, userusers, " in it");
  };

  let startGame = () => {
    console.log("-----START GAME-----");
    movedToGame = true;
    console.log("users: ", roomAndUsersInRoom);
    console.log("Current User: ", currentUser);
    //TODO Make it dispatch and check the contents of the room from the store
    let countUsersInRoom = roomAndUsersInRoom.users.length;
    console.log(roomAndUsersInRoom.room, "has ", countUsersInRoom, "users in it");

    socket.emit("start_game", sudokuBoard, (error) => {
      console.log("emit start game," + roomId);
      if (error) return console.log("ERROR STARTING GAME");
    });
    // history.push();
    history.push({
      pathname: `/sudoku`,
      search: `?roomCode=${roomId}`,
      state: {
        detail: sudokuBoard,
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
    <div>
      {console.log(roomAndUsersInRoom)}
      <div className="CreateGamePageContainer">
        <div className="CodeText">Your Code is:</div>
        <div className="Code">{roomId}</div>
        <div className="Loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <button className="JoinCreateBtn" onClick={() => checkAllUser()}>
          Check users in room
        </button>
        <div className="Waiting">Waiting for other player to join</div>
      </div>
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
      </div>
    </div>
  );
}

export default CreateGame;
