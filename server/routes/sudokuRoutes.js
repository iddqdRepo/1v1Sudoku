import express from "express";
import { getEasy, getMedium } from "../controllers/sudokuController.js";

const router = express.Router();

//Every route in here is accessed by going to localhost:5000/posts
//this was setup in index.js with app.use("/posts", postRoutes);

router.get("/easy", getEasy);
router.get("/medium", getMedium);

export default router;
