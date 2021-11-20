import axios from "axios";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + token.substring(1, token.length - 1),
  },
});

// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");

export default {
  getUserNickname(nickname) {
    return apiClient.get("/user/player/" + nickname);
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
  postAddToFavourites(nickname) {
    return apiClient.post("/user/add-to-favourites" + nickname);
  },
  postRemoveFromFavourites(nickname) {
    return apiClient.post("/user/remove-from-favourites" + nickname);
  },
  postRefreshToken() {
    return apiClient.post(
      "/auth/refresh-token" + refreshToken.substring(1, refreshToken.length - 1)
    );
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
  getInitialUsers() {
    return apiClient.get(
      "/game/ranking-games?limit=20&offset=2&filterBy=enemiesKilled&sort=DESC&favourites=false"
    );
  },
  getUserGames(limit, offset) {
    return apiClient.get(
      "/user/user-games?limit=" + limit + "&offset=" + offset
    );
  },
  getGameDetails(gameId) {
    return apiClient.get("/game/game-details/" + gameId);
  },
  getUserDetails() {
    return apiClient.get("/user/user-details");
  },
  getRankingGames(limit, offset, filterBy, sort, favourites) {
    return apiClient.get(
      "/game/ranking-games?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filterBy=" +
        filterBy +
        "&sort=" +
        sort +
        "&favourites=" +
        favourites
    );
  },
};
