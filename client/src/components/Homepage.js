import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import { io } from "socket.io-client";
import { getRoom, getAllUsers } from "../actions/sudokuActions";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../api";

//TODO Get the useState spread working for usersRooms, so I can test adding and removing rooms + manually check if they are full etc.

function Homepage() {
  const [val, setVal] = useState("");
  const [roomsData, setRoomsData] = useState(useSelector((state) => state.allUserDataReducer));
  // const [allUsersRoomsData, setAllUsersRoomsData] = useState([]);
  const [roomFull, setRoomFull] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    // getAllUsers();
    console.log("dispatching homepage getRoom");
    dispatch(getRoom()); //dispatching the action from ./actions/posts - redux
  }, [dispatch]);

  let roomId = useSelector((state) => state.roomCodeReducer);
  // let allUsersRoomsData = useSelector((state) => state.allUserDataReducer);
  console.log("room ID in roomId ", roomId);
  console.log("allUsersRoomsData: ", roomsData);

  // let joinRoom = (roomToJoin) => {
  //   console.log("Joining room, " + roomToJoin);

  //   socket.emit("join_room", { room: roomToJoin }, (error) => {
  //     console.log("emit joinroom name," + roomToJoin);
  //     if (error) setRoomFull(true);
  //     console.log("ERROR CREATING ROOM");
  //   });

  //   // //? This gives me access to the data of the users that are in the current room
  //   // socket.on("roomData", ({ users }) => {
  //   //   setUsers(users);
  //   //   console.log("JoinRoom setUsersRooms is ", users);
  //   // });

  //   // socket.on("allUserData", (data) => {
  //   //   setAllUsersRoomsData(data);
  //   //   console.log("JoinRoom AllUsersRoomsData is ", allUsersRoomsData);
  //   // });
  // };

  let checkAllUser = () => {
    console.log("-----TESTING-----");
    // console.log("allUsersTestCheck: ", allUsersTestCheck);
    console.log("allUsersRoomsData: ", roomsData);
    // console.log("users: ", users);
  };

  const createGame = () => {
    console.log("difficulty selected = ", difficulty);

    if (!difficulty) {
      return console.log("please select a difficulty");
    }

    history.push({
      pathname: `/create`,
      search: `?roomCode=${roomId}`,
      state: {
        detail: difficulty,
      },
    });
  };

  const chooseDifficulty = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
    console.log("difficulty is ", difficulty);
  };

  //TODO - change joinRoom <link> to usehistory on the condition that room exists in redux store, otherwise room doesnt exist error

  return (
    <div className="HomepageContainer">
      <div className="CreateGameContainer">
        <button className="JoinCreateBtn" onClick={() => createGame()}>
          Create Game
        </button>
      </div>
      <div onChange={chooseDifficulty}>
        <div>
          <input type="radio" value="easy" name="gender" /> Easy
        </div>
        <div>
          <input type="radio" value="medium" name="gender" /> Med
        </div>
        <div>
          <input type="radio" value="test" name="gender" /> test
        </div>
      </div>

      <div className="JoinGameContainer">
        <Link to={`/join?roomCode=${val}`}>
          <button className="JoinCreateBtn">Join Game</button>
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
