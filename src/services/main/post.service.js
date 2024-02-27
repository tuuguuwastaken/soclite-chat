import instance from "./service.interceptor";

const api = process.env.REACT_APP_BACKEND;

class PostService {
  static list() {
    return instance.get(`${api}/post/`);
  }
  static post(data) {
    return instance.post(`${api}/post/create`, {
      body: data.body,
      user: data.user,
    });
  }
}

export default PostService;
