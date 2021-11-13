import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  getUsers() {
    return apiClient.get("/data/player");
  },
  getUserId(id) {
    return apiClient.get("/data/player/" + id);
  },
  getUserNickname(nickname) {
    return apiClient.get("/data/player/" + nickname);
  },
  postLogin(url, email, password) {
    return apiClient.post(url, {
      email,
      password,
    });
  },
  postRegister(nickname, email, password) {
    return apiClient.post("/auth/register", {
      nickname,
      email,
      password,
    });
  },
  getUser() {
    return apiClient.get("user");
  },
  getUserDetails() {
    return apiClient.get("/user-details/");
  },
  getGameDetail() {
    return apiClient.get("/game-detail/");
  },
  postAddToFavourite(nickname) {
    return apiClient.post("add-to-favourites/", { nickname });
  },
  getRefreshToken() {
    return apiClient.get("refreshToken");
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
