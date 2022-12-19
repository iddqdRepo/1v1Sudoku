import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getEasy, getMedium, getTest } from "../actions/sudokuActions";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { prod } from "../prod";
// const socket = io.connect(prod ? "https://sudoku-vercel-test-zkh1.vercel.app" : "http://localhost:5000");
import { SocketContext } from "../context";

let movedToGame = false;
let currentUser = {};

//! Creategame on creating a room > refreshing > it joins the user to a blank room instead of just resetting it
//! So it must be emitting join_room when the page is refreshed, make it so it doesn't do this if the room is blank

function CreateGame() {
  const socket = useContext(SocketContext)
  const location = useLocation();
  const dispatch = useDispatch();
  const [roomAndUsersInRoom, setRoomAndUsersInRoom] = useState([]);
  
  let chosenDifficulty = location.state.detail;
  let roomId = useSelector((state) => state.roomCodeReducer);
  let history = useHistory();
  let sudokuBoard = useSelector((state) => state.sudokuReducers);

  useEffect(() => {
    dispatch(getAllUsers());
    if (chosenDifficulty === "easy") {
      dispatch(getEasy());
    } else if (chosenDifficulty === "medium") {
      dispatch(getMedium());
    } else if (chosenDifficulty === "test") {
      dispatch(getTest());
    }
  }, [dispatch]);

  useEffect(() => {
    socket.emit("join_room", { room: roomId }, (error) => {
      if (error){
        //^ If the room is empty (happens on page refresh in creategame room)
        //^ Kick user to homePage
        // console.log("ERROR CREATING ROOM");
        socket.off()
        history.push({
          pathname: `/`,
        });
      } 
    });

    return function cleanup() {
      if (!movedToGame) {
        socket.off();
      }
    };
  }, []);


  useEffect(() => {
        //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (UserRoomData) => {
      console.log("socket.on(roomData - creategame");
      console.log("UserRoomData.room ", UserRoomData.room)

        setRoomAndUsersInRoom(UserRoomData);
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

    socket.on("endgameemit", (payload) => {
      // console.log("socket.on(end_game_emit - SudokuBoard");
      // console.log(payload, " has won");
      // console.log("currentUser is: ", currentUser.name);
      //^ If the user refreshes the page, take them back to the homepage
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

  let startGame = () => {
    console.log("-----START GAME-----");
    console.log("room is ", roomId)
    movedToGame = true;
    socket.emit("start_game", sudokuBoard, (error) => {
      console.log("EMIT START_GAME " + roomId, " - creategame");
      if (error) return console.log("ERROR STARTING GAME");
    });
    history.push({
      pathname: `/sudoku`,
      search: `?roomCode=${roomId}`,
      state: {
        detail: { sudokuBoard, currentUser },
      },
    });
  };

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
