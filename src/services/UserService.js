import axios from "axios";

var refreshToken = localStorage.getItem("refreshToken");

var apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export default {
  setHeader(tokenn) {
    apiClient.defaults.headers.common["Authorization"] = "Bearer " + tokenn;
  },
  postLogin(email, password) {
    apiClient.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    return apiClient.post("/auth/login", {
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
  postResetPassword(email) {
    return apiClient.post("/auth/reset-password", {
      email,
    });
  },
  postAddToFavourites(nickname) {
    return apiClient.post("/user/add-to-favourites", {
      favouriteNickname: nickname,
    });
  },
  postRemoveFromFavourites(nickname) {
    return apiClient.post("/user/remove-from-favourites", {
      unfavouriteNickname: nickname,
    });
  },
  postRefreshToken() {
    return apiClient.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
  },
  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
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
  getNextRankingGames(limit, offset, filterBy, sort, favourites) {
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
  getGameSearch(nickname, filterBy, range) {
    return apiClient.get(
      "/game/search-games?nickname=" +
        nickname +
        "&filterBy=" +
        filterBy +
        "&range=" +
        range
    );
  },
};
