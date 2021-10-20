import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { getRoom } from "../actions/sudokuActions";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../api";

//TODO Get the useState spread working for usersRooms, so I can test adding and removing rooms + manually check if they are full etc.

function Homepage() {
  const [val, setVal] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsersRoomsData, setAllUsersRoomsData] = useState("");
  const [roomFull, setRoomFull] = useState(false);

  let history = useHistory();
  const socket = io.connect("http://localhost:5000");

  const dispatch = useDispatch();

  useEffect(() => {
    // getAllUsers();
    console.log("dispatching getTest");
    dispatch(getRoom()); //dispatching the action from ./actions/posts - redux
  }, [dispatch]);

  let roomId = useSelector((state) => state.sudokuReducers);

  let createRoom = (room) => {
    console.log("Creating room, " + room + " adding room to list ");
    socket.emit("join_room", { room: room }, (error) => {
      console.log("emit joinroom name," + room);
      if (error) console.log("ERROR CREATING ROOM");
    });

    //? When the room is created on the server, it emits the data (from server to client instead of client to server) with "io.to(newUser.room).emit("roomData")"
    //? This socket.on grabs that emitted roomData and stores it in the useState variable here
    //? This gives me access to the data of the users that are in the current room
    //? socket.emit and socket.on seems to be able to go both ways, emitted from client, or server, which is cool
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log("CreateRoom setUsersRooms is ", users);
    });

    socket.on("allUserData", (allUsersRoomsData) => {
      console.log("ALLUSERDATAEMITED");
      console.log("allUserData is ", allUsersRoomsData);
      setAllUsersRoomsData(allUsersRoomsData);
      console.log(console.log("createRoom AllUsersRoomsData is ", allUsersRoomsData));
    });
  };

  let joinRoom = (roomToJoin) => {
    console.log("Joining room, " + roomToJoin);

    socket.emit("join_room", { room: roomToJoin }, (error) => {
      console.log("emit joinroom name," + roomToJoin);
      if (error) setRoomFull(true);
      console.log("ERROR CREATING ROOM");
    });

    //? This gives me access to the data of the users that are in the current room
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log("JoinRoom setUsersRooms is ", users);
    });

    socket.on("allUserData", (data) => {
      setAllUsersRoomsData(data);
      console.log(console.log("JoinRoom AllUsersRoomsData is ", allUsersRoomsData));
    });
  };

  let startGame = (val) => {
    history.push("/sudoku");
  };

  return (
    <div className="HomepageContainer">
      <div className="CreateGameContainer">
        <Link to={`/play?roomCode=${roomId}`}>
          <button
            className="JoinCreateBtn"
            onClick={() => {
              createRoom(roomId);
            }}
          >
            Create Game
          </button>
        </Link>
      </div>
      <div className="TestStartGameCreateGameContainer">
        <button className="JoinCreateBtn" onClick={startGame}>
          Start Game
        </button>
      </div>
      <div className="JoinGameContainer">
        <Link to={`/play?roomCode=${val}`}>
          <button className="JoinCreateBtn" onClick={() => joinRoom(val)}>
            Join Game
          </button>
        </Link>
        <input
          className="JoinGameInput"
          placeholder="Enter game code"
          value={val}
          onInput={(e) => {
            setVal(e.target.value);
          }}
        ></input>
        <button className="JoinCreateBtn" onClick={() => console.log(users)}>
          CheckList
        </button>
      </div>
    </div>
  );
}

export default Homepage;
