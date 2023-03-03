import axios from 'axios'
export const AXIOS_INTANCE = axios.create({ baseURL: "http://localhost:4000/api" });