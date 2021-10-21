import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { getRoom, getAllUsers } from "../actions/sudokuActions";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../api";

//TODO Get the useState spread working for usersRooms, so I can test adding and removing rooms + manually check if they are full etc.

function Homepage() {
  const [val, setVal] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsersRoomsData, setAllUsersRoomsData] = useState([]);
  const [roomFull, setRoomFull] = useState(false);

  let history = useHistory();
  const socket = io.connect("http://localhost:5000");

  const dispatch = useDispatch();

  useEffect(() => {
    // getAllUsers();
    console.log("dispatching homepage getRoom");
    dispatch(getRoom()); //dispatching the action from ./actions/posts - redux
  }, [dispatch]);

  let roomId = useSelector((state) => state.roomCodeReducer);
  let allUsersTestCheck = useSelector((state) => state.allUserDataReducer);
  console.log("room ID in roomId ", roomId);
  console.log("allUsersTestCheck: ", allUsersTestCheck);

  let joinRoom = (roomToJoin) => {
    console.log("Joining room, " + roomToJoin);

    socket.emit("join_room", { room: roomToJoin }, (error) => {
      console.log("emit joinroom name," + roomToJoin);
      if (error) setRoomFull(true);
      console.log("ERROR CREATING ROOM");
    });

    // //? This gives me access to the data of the users that are in the current room
    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    //   console.log("JoinRoom setUsersRooms is ", users);
    // });

    // socket.on("allUserData", (data) => {
    //   setAllUsersRoomsData(data);
    //   console.log("JoinRoom AllUsersRoomsData is ", allUsersRoomsData);
    // });
  };

  let startGame = (val) => {
    history.push("/sudoku");
  };

  let checkAllUser = () => {
    console.log("-----TESTING-----");
    console.log("allUsersTestCheck: ", allUsersTestCheck);
    console.log("allUsersRoomsData: ", allUsersRoomsData);
    console.log("users: ", users);
  };

  return (
    <div className="HomepageContainer">
      <div className="CreateGameContainer">
        <Link to={`/play?roomCode=${roomId}`}>
          <button className="JoinCreateBtn">Create Game</button>
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
        <button className="JoinCreateBtn" onClick={() => checkAllUser()}>
          Check all user list
        </button>
      </div>
    </div>
  );
}

export default Homepage;
