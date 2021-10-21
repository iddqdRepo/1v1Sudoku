import express from "express";
import { getEasy, getMedium, getTest, getUsers } from "../controllers/sudokuController.js";

const router = express.Router();

//Every route in here is accessed by going to localhost:5000/sudoku
//this was setup in index.js with app.use("/sudoku", sudokuroutes);

router.get("/easy", getEasy);
router.get("/medium", getMedium);
router.get("/test", getTest);
router.get("/users", getUsers);

export default router;
