import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/sudokuActions";
import { io } from "socket.io-client";
import queryString from "query-string";
import { useHistory, Link, useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:5000");
let movedToGame = false;
//! Should this be useref?
let currentUser = {};

//! Joingame renders 1 time, then 2 times, then 3 times, then 4 times and so on
//! See Below

function JoinGame(props) {
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]);
  // const [currentUser, setCurrentUser] = useState({});
  const roomCodeData = queryString.parse(props.location.search).roomCode;
  let allUsersTestCheck = useSelector((state) => state.allUserDataReducer);
  const dispatch = useDispatch();
  let roomId = roomCodeData;
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllUsers());
    // console.log("----- USE EFFECT CALL ----------");
    // console.log("URL = ", );
  }, [dispatch]);

  useEffect(() => {
    // console.log("Joining room, " + roomId + " adding room to list ");
    socket.emit("join_room", { room: roomId }, (error) => {
      console.log("EMIT JOIN_ROOM," + roomId);
      if (error) console.log("ERROR JOINING ROOM");
    });
    dispatch(getAllUsers());
    return function cleanup() {
      // socket.disconnect(); --- this causes the can't create room again error
      // console.log("MOVED TO GAME IS ", movedToGame);
      if (!movedToGame) {
        console.log("CLEANUP INITIATED");
        //shut down connnection instance
        socket.off();
      }
    };
  }, []);

  useEffect(() => {
    //! Every time I leave and join any game, this gets rendered 1 more time (4th time I do it, it renders 4 times over and over etc)
    //! Probably due to the useState in the homepage and typing stuff in?

    console.log("----- JOINGAME USE EFFECT CALL ----------");
    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (UserRoomData) => {
      console.log("socket.on(roomData - joingame");
      setRoomAndUsersInRoom(UserRoomData);
    });

    socket.on("currentUserData", (currUser) => {
      console.log("socket.on(currentUserData - joingame");
      // console.log("Current user fired, it is: ", currUser);
      currentUser = currUser;
      // currentUser = currUser;
      // console.log("setCurrentUser is: ", currentUser);
    });

    socket.on("message", (msg) => {
      // setCurrentUser(currUser);
      console.log("socket.on(message - joingame", msg);
      // console.log(msg);
    });

    socket.on("endgameemit", (payload) => {
      console.log("socket.on(end_game_emit - SudokuBoard");
      console.log(payload, " has won");
      console.log("currentUser is: ", currentUser);
      if (payload.winner === currentUser.name) {
        history.push({
          pathname: `/hey`,
          search: `Winner`,
        });
      } else {
        history.push({
          pathname: `/hey`,
          search: `Loser`,
        });
      }
      // if (error) return console.log("ERROR FINISHING GAME");
    });
    //TODO - current user is an empty array?
    socket.on("startGameData", (sudokuBoard) => {
      console.log("ON STARTGAMEDATA " + roomId, " - joingame");
      // console.log("JOIN GAME DATA ", { sudokuBoard, currentUser });
      movedToGame = true;
      // console.log("startGameData current user is: ", currentUser);
      console.log("startGameData cUser is: ", currentUser);
      history.push({
        pathname: `/sudoku`,
        search: `?roomCode=${roomId}`,
        state: {
          detail: { sudokuBoard, currentUser },
        },
      });
    });
  }, []);

  // console.log("JoinRoom setUsersRooms is ", roomAndUsersInRoom);
  // console.log("JoinRoom current user is ", currentUser);

  let checkAllUser = () => {
    console.log("-----TESTING-----");
    console.log("users: ", roomAndUsersInRoom);
    console.log("Current User: ", currentUser);

    let roomVal = 0;

    allUsersTestCheck.map((item) => {
      if (item.room === roomAndUsersInRoom.room) {
        roomVal += 1;
      }
    });
    console.log(roomAndUsersInRoom.room, "has ", roomVal, "users in it");
  };

  // let roomId = "creategame";

  return (
    <div>
      <div className="CreateGamePageContainer">
        <div className="CodeText">Joined Room:</div>
        <div className="Code">{roomCodeData}</div>
        <div className="Loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <button className="JoinCreateBtn" onClick={() => checkAllUser()}>
          Check users in room
        </button>
        <div className="Waiting">Waiting for Player 1 to start the game</div>
      </div>
    </div>
  );
}

export default JoinGame;
