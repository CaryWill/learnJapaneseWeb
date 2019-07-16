import axios from "axios";

export function fetchPostsApi(type) {
  return axios.get("https://ljpdev.herokuapp.com/api/v1/posts", {
    params: {
      type
    }
  });
}

export function postApi({
  type,
  artist,
  title,
  description,
  id,
  body,
  date,
  categories
}) {
  const params = {
    type,
    artist,
    title,
    description,
    id,
    body,
    date,
    categories
  };

  return axios.post("https://ljpdev.herokuapp.com/api/v1/posts", params);
}

export function loginApi(email, password) {
  return axios.get("https://ljpdev.herokuapp.com/user/login", {
    params: {
      email,
      password
    }
  });
}
