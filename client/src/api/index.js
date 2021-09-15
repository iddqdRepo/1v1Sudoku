import axios from "axios";

const easyURL = "http://localhost:5000/sudoku/easy";
const mediumURL = "http://localhost:5000/sudoku/medium";

export const fetchEasyBoard = () => axios.get(easyURL);
export const fetchMediumBoard = () => axios.get(mediumURL);
