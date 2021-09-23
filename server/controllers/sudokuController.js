import modelExport from "../models/sudokuModel.js";

//All the logic for the routes, makes it scalable and readable
//it takes time so it must be an async function
export const getEasy = async (req, res) => {
  //try to retrieve all the posts in the database
  try {
    //needs to have await becayse it is an async function
    const sudokuEasy = await modelExport.SudokuEasy.find(); //running a command on mongoDB model to find all posts
    console.log("retrieved sudoku Easy Board from sudokuController.js");
    // console.log(JSON.stringify(sudokuEasy, "*", 2));
    res.status(200).json(sudokuEasy);
  } catch (error) {
    console.log("error in controllers/sudokuController.js)");
    res.status(404).json({ message: error.message });
  }
};

export const getMedium = async (req, res) => {
  //try to retrieve all the posts in the database
  try {
    //needs to have await becayse it is an async function
    const sudokuMedium = await modelExport.SudokuMeds.find(); //running a command on mongoDB model to find all posts
    console.log("retrieved sudoku Medium Board from sudokuController.js");
    res.status(200).json(sudokuMedium);
  } catch (error) {
    console.log("error in controllers/sudokuController.js)");
    res.status(404).json({ message: error.message });
  }
};

export const getTest = async (req, res) => {
  //try to retrieve all the posts in the database
  try {
    //needs to have await becayse it is an async function
    const sudokuTest = await modelExport.SudokuTest.find(); //running a command on mongoDB model to find all posts
    console.log("retrieved sudoku Test Board from sudokuController.js");
    res.status(200).json(sudokuTest);
  } catch (error) {
    console.log("error in controllers/sudokuController.js)");
    res.status(404).json({ message: error.message });
  }
};
