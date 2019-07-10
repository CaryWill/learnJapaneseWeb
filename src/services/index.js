import axios from "axios";

export function fetchPostsApi(type) {
  return axios.get("https://ljpdev.herokuapp.com/api/v1/posts", {
    params: {
        type
    }
  });
}
