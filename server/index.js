import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sudokuRoutes from "./routes/sudokuRoutes.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, getUsersInRoom, getDataInUserList } from "./users.js";

dotenv.config();

console.log();

const app = express();

const server = createServer(app); //for server to handle socket.io

app.use(express.json({ limit: "30mb", extended: true })); //every requrest that comes in will go through this middleware and be converted to JSON
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const io = new Server(server, {
  cors: {
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
    },
  },
});
app.use("/sudoku", sudokuRoutes);

io.on("connection", (socket) => {
  // console.log("New WS connection with id" + socket.id);

  socket.on("join_room", (payload, callback) => {
    //payload is info, callback is error

    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;
    const { error, newUser } = addUser({
      userId: socket.id,
      username: numberOfUsersInRoom === 0 ? "Player 1" : "Player 2",
      room: payload.room,
    });

    //If there are more than two people in a room, return an error
    if (error) return callback(error);

    console.log("error is: ", error);

    socket.join(payload.room);
    console.log("num users in room ", payload.room, "is ", getUsersInRoom(payload.room).length);

    // console.log("user list data: ", getDataInUserList());

    //TODO only emit roomData if there is a newUser returned, otherwise error is returned and it crashes
    io.to(newUser.room).emit("roomData", { room: newUser.room, users: getUsersInRoom(newUser.room) });
    let allData = getDataInUserList();
    console.log("allData", allData);

    //emits all user data to be stored in AllUsersRoomsData in homepage
    io.to(newUser.room).emit("allUserData", allData);
    console.log("alldataObj = ", { allData });
  });

  //Welcome connected user
  socket.emit("message", "Welcome to Sudoku!");

  //Broadcast when a player connects
  socket.broadcast.emit("message", "A user had joined the game");

  //tell other person has disconnected
  socket.on("disconnect", () => {
    console.log(`${socket.id} has left the game`);
    io.emit("message", `${socket.id} has left the game`);
  });
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true, //for warning in the console
    useUnifiedTopology: true, //for warning in the console
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
