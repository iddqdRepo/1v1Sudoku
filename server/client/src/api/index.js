import axios from "axios";
import { prod } from "../prod";


// const easyURL = "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/easy";
// const mediumURL = "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/medium";
// const testURL = "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/test";
// const userURL = "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/users";

const easyURL = prod ? "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/easy" : "http://localhost:5000/sudoku/easy";
const mediumURL = prod ? "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/medium" : "http://localhost:5000/sudoku/medium";
const testURL = prod ? "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/test" : "http://localhost:5000/sudoku/test";
const userURL = prod ? "https://sudoku-vercel-test-zkh1.vercel.app/sudoku/users" : "http://localhost:5000/sudoku/users";

export const fetchEasyBoard = () => axios.get(easyURL);
export const fetchMediumBoard = () => axios.get(mediumURL);
export const fetchTestBoard = () => axios.get(testURL);
export const fetchUsers = () => axios.get(userURL);
