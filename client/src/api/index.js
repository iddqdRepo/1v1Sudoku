import axios from "axios";

const easyURL = "http://localhost:5000/sudoku/easy";
const mediumURL = "http://localhost:5000/sudoku/medium";

export const fetchEasyPosts = () => axios.get(easyURL);
export const fetchMediumPosts = () => axios.get(mediumURL);
