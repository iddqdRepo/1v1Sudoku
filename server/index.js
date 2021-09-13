import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sudokuRoutes from "./routes/sudokuRoutes.js";
import dotenv from "dotenv";
dotenv.config();

console.log();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/sudoku", sudokuRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true, //for warning in the console
    useUnifiedTopology: true, //for warning in the console
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
