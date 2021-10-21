import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/sudokuActions";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function CreateGame() {
  const dispatch = useDispatch();
  const [us, setUs] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
    // console.log("----- USE EFFECT CALL ----------");
  }, [dispatch]);

  useEffect(() => {
    socket.emit("join_room", { room: roomId }, (error) => {
      console.log("emit joinroom name," + roomId);
      if (error) console.log("ERROR CREATING ROOM");
    });

    console.log("----- USE EFFECT CALL ----------");
    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", (u) => {
      setUs(u);
      console.log("CreateRoom u is ", u);
      console.log("CreateRoom setUsersRooms is ", us);
    });
  }, []);

  let roomId = useSelector((state) => state.roomCodeReducer);

  console.log("Creating room, " + roomId + " adding room to list ");

  let checkAllUser = () => {
    console.log("-----TESTING-----");
    console.log("users: ", us);
  };

  // let roomId = "creategame";

  return (
    <div>
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
  );
}

export default CreateGame;
