import io from "socket.io-client";
import React from "react";
import { prod } from "./prod";

export const socket = io.connect(prod ? "https://sudoku-vercel-test-zkh1.vercel.app" : "http://localhost:5000");
export const SocketContext = React.createContext();