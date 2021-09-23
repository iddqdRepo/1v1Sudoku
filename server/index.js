import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sudokuRoutes from "./routes/sudokuRoutes.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

console.log();

const app = express();
const server = createServer(app); //for server to handle socket.io

app.use(express.json({ limit: "30mb", extended: true }));
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
  console.log("New WS connection..");

  //Welcome connected user
  socket.emit("message", "Welcome to Sudoku!");

  //Broadcast when a player connects
  socket.broadcast.emit("message", "A user had joined the game");

  //tell other person has disconnected
  socket.on("disconnect", () => {
    io.emit("message", "a user has left the game");
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
