import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/sudokuActions";
import { io } from "socket.io-client";
import queryString from "query-string";
import { useHistory, Link, useLocation } from "react-router-dom";
import { prod } from "../prod";
import { SocketContext } from "../context";

// const socket = io.connect(prod ? "https://sudoku1v1.herokuapp.com" : "http://localhost:5000");
let movedToGame = false;
let currentUser = {};


//! Joingame renders 1 time, then 2 times, then 3 times, then 4 times and so on
//! See Below

function JoinGame(props) {
  const socket = useContext(SocketContext)
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]); //! Unmounted component
  // const [currentUser, setCurrentUser] = useState({});
  const roomCodeData = queryString.parse(props.location.search).roomCode;
  let allUsersTestCheck = useSelector((state) => state.allUserDataReducer);
  const dispatch = useDispatch();
  let roomId = roomCodeData;
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("join_room", { room: roomId }, (error) => {
      console.log("EMIT JOIN_ROOM," + roomId);
      if (error) console.log("ERROR JOINING ROOM");
    });
    dispatch(getAllUsers());
    return function cleanup() {
      console.log("DOES REFRESHING TRIGGER THIS - JOINGAME");
      // socket.disconnect(); --- this causes the can't create room again error
      // console.log("MOVED TO GAME IS ", movedToGame);
      if (!movedToGame) {
        console.log("CLEANUP INITIATED");
        //shut down connnection instance
        socket.off();
      }
    };
  }, []);

  // const alertUser = (e) => {
  //   console.log("joinGame alertUser");
  //   e.preventDefault();
  //   e.returnValue = "";
  // };
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  useEffect(() => {
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
      // console.log("socket.on(end_game_emit - SudokuBoard");
      // console.log(payload, " has won");
      // console.log("currentUser is: ", currentUser);
      // console.log("winner is ", payload, " winner is ", currentUser.name);
      if (payload === currentUser.name) {
        console.log("Disconnect?");
        socket.off();
        history.push({
          pathname: `/result`,
          search: `?Winner`,
          state: {
            detail: { winner: true },
          },
        });
      } else {
        console.log("Disconnect?");
        socket.off();
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

  console.log("roomAndUsersInRoom.users === undefined ", roomAndUsersInRoom.users === undefined);
  console.log("roomAndUsersInRoom.users  ", roomAndUsersInRoom.users);

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
  ) : roomAndUsersInRoom.users.length === 2 ? (
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
        {/* <button className="JoinCreateBtn" onClick={() => checkAllUser()}>
          Check users in room
        </button> */}
        <div className="Waiting">Waiting for Player 1 to start the game</div>
      </div>
    </div>
  ) : (
    <div className="CreateGamePageContainer">
      <div className="CodeText">Other Player Left</div>
      <Link to="/">
        <button
          className="JoinCreateBtn"
          onClick={() => {
            socket.off();
          }}
        >
          Home
        </button>
      </Link>
    </div>
  );
}

export default JoinGame;
