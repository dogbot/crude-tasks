/*eslint-disable no-unused-vars */
import axios from "axios";

const jsonserver = "http://localhost:3000/"
const mockapi = "https://62cec7c8486b6ce8264c8ab8.mockapi.io/api/v1/"
const webquiz = "http://localhost:8002/api/v1/"

export default axios.create({
  baseURL: jsonserver,
  headers: {
    "Content-type": "application/json"
  }
});
