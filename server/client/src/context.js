import io from "socket.io-client";
import React from "react";
import { prod } from "./prod";

export const socket = io.connect(prod ? "https://sudoku1v1.herokuapp.com" : "http://localhost:5000");
export const SocketContext = React.createContext();