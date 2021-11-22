import axios from "axios";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + token.substring(1, token.length - 1),
  },
});

export default {
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
      refreshToken: localStorage
        .getItem("refreshToken")
        .substring(1, refreshToken.length - 1),
    });
  },
  logout() {
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
