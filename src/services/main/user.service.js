import instance from "./service.interceptor";

const api = process.env.REACT_APP_BACKEND;

class UserService {
  static createUser(data) {
    return instance.post(`${api}/user/create`, {
      username: data.username,
      password: data.password,
    });
  }
  static loginUser(data) {
    return instance.post(`${api}/user/login`, {
      username: data.username,
      password: data.password,
    });
  }
}

export default UserService;
