import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/sudokuActions";
import { io } from "socket.io-client";
import queryString from "query-string";
import { useHistory, Link, useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:5000");
let movedToGame = false;

//! Joingame renders 1 time, then 2 times, then 3 times, then 4 times and so on
//! See Below

function JoinGame(props) {
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
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
    console.log("Joining room, " + roomId + " adding room to list ");
    socket.emit("join_room", { room: roomId }, (error) => {
      console.log("emit joinroom name," + roomId);
      if (error) console.log("ERROR CREATING ROOM");
    });
    dispatch(getAllUsers());
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
    //! Every time I leave and join any game, this gets rendered 1 more time (4th time I do it, it renders 4 times over and over etc)
    //! Probably due to the useState in the homepage and typing stuff in?

    console.log("----- JOINGAME USE EFFECT CALL ----------");
    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (UserRoomData) => {
      setRoomAndUsersInRoom(UserRoomData);
    });

    socket.on("currentUserData", (currUser) => {
      setCurrentUser(currUser);
    });

    socket.on("message", (msg) => {
      // setCurrentUser(currUser);
      console.log(msg);
    });

    socket.on("startGameData", (board) => {
      movedToGame = true;
      history.push({
        pathname: `/sudoku`,
        search: `?roomCode=${roomId}`,
        state: {
          detail: board,
        },
      });
    });
  }, []);

  console.log("JoinRoom setUsersRooms is ", currentUser);
  console.log("JoinRoom setUsersRooms is ", roomAndUsersInRoom);
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
        <div className="CodeText">Joining Room:</div>
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
