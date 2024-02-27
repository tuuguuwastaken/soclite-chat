import axios from "axios";
import { message } from "antd";

const instance = axios.create();

const error = (err) => {
  message.error(err);
};

instance.interceptors.request.use(
  (request) => {
    // const token = localStorage.getItem("token");
    if (!request.url?.includes("file")) {
      request.headers["Content-Type"] = "application/json";
    }
    // request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (request) => {
    return request;
  },
  (err) => {
    switch (err.status) {
      case 400:
        error(err.response.data.message);
        return Promise.reject(err);
      case 401:
        error("Session expired.");
        return Promise.reject(err);
      case 404:
        error(err.response.data.message);
        return Promise.reject(err);
      case 500:
        error("Системийн дотоод алдаа.");
        return Promise.reject(err);
      case 403:
        error("Таны эрх хүрэлцэхгүй байна.");
        return Promise.reject(err);
      default:
        error("Алдаа гарлаа.");
        return Promise.reject(err);
    }
  }
);

export default instance;
