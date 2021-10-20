import axios from "axios";

const easyURL = "http://localhost:5000/sudoku/easy";
const mediumURL = "http://localhost:5000/sudoku/medium";
const testURL = "http://localhost:5000/sudoku/test";
const userURL = "http://localhost:5000/sudoku/users";

export const fetchEasyBoard = () => axios.get(easyURL);
export const fetchMediumBoard = () => axios.get(mediumURL);
export const fetchTestBoard = () => axios.get(testURL);
export const fetchUsers = () => axios.get(userURL);
