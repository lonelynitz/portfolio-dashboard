import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BACKEND_SERVICE || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
