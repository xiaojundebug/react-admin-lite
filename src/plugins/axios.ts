import axios from "axios";
import { BASE_URL } from "../common/const";
import { message } from "antd";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
  response => {
    console.log(
      `%creceived mock data from %c${response.config.url}`,
      "color:#00b586;",
      "color:#e63d31;"
    );
    console.log(response.data.t);
    // if (response.data.status === "SUCCESS") {
      return response.data.t;
    // } else {
    //   message.error(response.data.message);
    //   return Promise.reject(response.data.message);
    // }
  },
  error => {
    message.error("Netword Error!!!");
    return Promise.reject("Network Error!!!");
  }
);

export default axios;
