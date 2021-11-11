import axios from "axios";

const easyURL = "https://sudoku1v1.herokuapp.com/sudoku/easy";
const mediumURL = "https://sudoku1v1.herokuapp.com/sudoku/medium";
const testURL = "https://sudoku1v1.herokuapp.com/sudoku/test";
const userURL = "https://sudoku1v1.herokuapp.com/sudoku/users";

export const fetchEasyBoard = () => axios.get(easyURL);
export const fetchMediumBoard = () => axios.get(mediumURL);
export const fetchTestBoard = () => axios.get(testURL);
export const fetchUsers = () => axios.get(userURL);
