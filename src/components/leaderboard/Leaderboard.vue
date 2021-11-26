<script>
import UserService from "../../services/UserService.js";
import { collapsed, toggleSidebar } from "../sidebar/state";
import Dropdown from "./Dropdown";
import DropdownFilters from "./DropdownFilters";
import Modal from "./Modal";
import SortButton from "./SortButton";
import { notify } from "notiwind";
import Searchbar from "../searchbar/Searchbar.vue";
export default {
  data() {
    return {
      criteriumName: "Total Score",
      criterium: "totalScore",
      limitF: 8,
      offsetF: 0,
      filterByF: "totalScore",
      sortF: "ASC",
      favouritesF: false,
      users: [{ nickname: "" }],
      activeGames: [],
      activeUser: 0,
      error: null,
      isFetching: true,
      userDetails: null,
      order: -1,
      showModal: false,
      gameId: null,
      gameDetail: null,
      pullingModal: null,
      pullingLeaderboard: null,
      sortBy: "totalScore",
      favourites: [],
    };
  },
  name: "index",
  components: { Modal, SortButton, Searchbar, DropdownFilters, Dropdown },
  methods: {
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          UserService.getNextRankingGames(
            3,
            this.users.length,
            this.filterByF,
            this.sortF,
            this.favouritesF
          ).then((response) => {
            if (response.data[0]) this.users.push(response.data[0]);
            if (response.data[1]) this.users.push(response.data[1]);
            if (response.data[2]) {
              this.users.push(response.data[2]);
            } else {
              this.notify_generic("You've reached the end of the leaderboard");
            }
          });
          this.limitF += 3;
        }
      };
    },
    showUserCard: async function (gameId, i) {
      this.activeUser = i;
      this.gameId = gameId;
      await this.fetchModalData();
      this.showModal = true;
      if (this.activeGames.includes(gameId)) {
        this.pullingModal = setInterval(() => {
          this.fetchModalData();
        }, 1000);
      }
    },
    fetchModalData: async function () {
      await UserService.getGameDetails(this.gameId)
        .then((response) => {
          this.gameDetail = response.data;
          if (response.data.finished) {
            const index = this.activeGames.indexOf(this.gameId);
            this.activeGames.splice(index, 1);
            clearInterval(this.pullingModal);
          }
          console.log("Modal data pull");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error);
            this.notify_error(error.response.data.error);
          }
        });
    },
    fetchLeaderboardData: async function () {
      await UserService.getRankingGames(
        this.limitF,
        this.offsetF,
        this.filterByF,
        this.sortF,
        this.favouritesF
      )
        .then((response) => {
          this.users = response.data;
          console.log("leaderboard data pull");
          this.activeGames = this.users.reduce((ids, thing) => {
            if (thing.isFinished == 0) {
              ids.push(thing.gameId);
            }
            return ids;
          }, []);
        })
        .catch((err) => {
          this.error = err.message;
          console.error(err.message);
        });
      console.log("Active game id's: " + this.activeGames);
    },
    closeModal: function () {
      this.showModal = false;
      clearInterval(this.pullingModal);
    },
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.transform = "translateX(-10%)";
    },
    /* eslint-disable */
    enter: function (el, done) {
      const delay = el.dataset.index > 10 ? 2200 : el.dataset.index * 200;
      setTimeout(function () {
        el.style.opacity = 1;
        el.style.transform = "translateX(0)";
      }, delay);
    },
    isFavourite: function (favourite) {
      if (this.favourites.includes(favourite)) {
        return true;
      } else {
        return false;
      }
    },
    addToFavourite: async function (nickname) {
      await UserService.postAddToFavourites(nickname)
        .then((response) => {
          this.favourites.push(nickname);
        })
        .catch((error) => {
          if (error.response) {
            this.notify_error(error.response.data.error);
          }
        });
    },
    removeFromFavourite: async function (nickname) {
      await UserService.postRemoveFromFavourites(nickname)
        .then((response) => {
          if (this.favourites.includes(nickname)) {
            const index = this.favourites.indexOf(nickname);
            this.favourites.splice(index, 1);
          }
        })
        .catch((error) => {
          if (error.response) {
            this.notify_error(error.response.data.error);
          }
        });
    },
    changeToScore: async function () {
      this.filterByF = "totalScore";
      await this.fetchLeaderboardData();
      console.log("Score");
      this.notify_generic("Total score is the new leaderboard criterium");
      this.criteriumName = "Total Score";
      this.criterium = "totalScore";
    },
    changeToStars: async function () {
      this.filterByF = "gatheredStars";
      await this.fetchLeaderboardData();
      console.log("Stars");
      this.notify_generic(
        "Number of gathered stars is the new leaderboard criterium"
      );
      this.criteriumName = "Gathered Stars";
      this.criterium = "gatheredStars";
    },
    changeToKilled: async function () {
      this.filterByF = "enemiesKilled";
      await this.fetchLeaderboardData();
      console.log("killed");
      this.notify_generic(
        "Number of killed enemies is the new leaderboard criterium"
      );
      this.criteriumName = "Killed Enemies";
      this.criterium = "enemiesKilled";
    },
    favouritesFilter: async function () {
      this.favouritesF = true;
      await this.fetchLeaderboardData();
      console.log("favourites");
      this.notify_generic("Filter has been changed to FAVOURITES");
    },
    mypositionFilter: async function () {
      console.log("my position");
      console.log(this.userDetails.nickname);
      await UserService.getGameSearch(
        this.userDetails.nickname,
        this.filterByF,
        Math.floor(this.limitF / 2)
      )
        .then((response) => {
          console.log("search user: " + searchNickname);
          this.users = response.data;
          this.limitF = 3;
          this.offsetF = this.users[0].gameId + 1;
        })
        .catch((error) => {
          if (error.response) {
            this.notify_error("There is no such user: " + searchNickname);
          }
        });
      this.notify_generic("Filter has been changed to MY POSITION");
    },
    removeFilter: async function () {
      this.limitF = 8;
      this.offsetF = 0;
      this.filterByF = "totalScore";
      this.sortF = "ASC";
      this.favouritesF = false;
      await this.fetchLeaderboardData();
      console.log("Removed filter");
      this.notify_generic("Filter has been removed");
    },
    fetchSorted: async function () {
      if (this.sortF == "ASC") {
        this.sortF = "DESC";
      } else {
        this.sortF = "ASC";
      }
      await this.fetchLeaderboardData();
      console.log("sort " + this.sortF);
      this.notify_generic("Leaderboard sorted " + this.sortF);
    },
    searchNickname: async function (searchNickname) {
      if (searchNickname.length > 0) {
        await UserService.getGameSearch(
          searchNickname,
          this.filterByF,
          Math.floor(this.limitF / 2)
        )
          .then((response) => {
            console.log("search user: " + searchNickname);
            this.users = response.data;
            this.offsetF = this.users[0].rank;
          })
          .catch((error) => {
            if (error.response) {
              this.notify_error("There is no such user: " + searchNickname);
            }
          });
      } else {
        this.limitF = 8;
        this.offsetF = 0;
        await this.fetchLeaderboardData();
      }
    },
    notify_generic: function (message) {
      notify(
        {
          group: "generic",
          text: message,
        },
        3000
      );
    },
    notify_error: function (message) {
      notify(
        {
          group: "error",
          title: "Error",
          text: message,
        },
        3000
      );
    },
  },

  async created() {
    await UserService.getUserDetails()
      .then((response) => {
        this.favourites = response.data.favourites.map((e) => e.nickname);
        this.userDetails = response.data;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
    this.fetchLeaderboardData();
    this.pullingLeaderboard = setInterval(() => {
      this.fetchLeaderboardData();
    }, 30000);
  },
  beforeUnmount() {
    clearInterval(this.pullingLeaderboard);
  },
  mounted() {
    this.getNextUser();
  },
  setup() {
    return { collapsed, toggleSidebar };
  },
  computed: {
    filteredUsers: function () {
      return this.users.filter((val) => val !== undefined && val !== null);
    },
  },
};
</script>

<template>
  <div class="page" id="app">
    <header class="page__header">
      <h1 class="page__title">Leaderboard</h1>
    </header>
    <div class="toolbar">
      <Dropdown
        class="criteriaFilter"
        @changeToScore="changeToScore()"
        @changeToKilled="changeToKilled()"
        @changeToStars="changeToStars()"
      />
      <Searchbar class="searchFilter" @searchGame="searchNickname" />
      <DropdownFilters
        class="dropdownFilter"
        @mypositionFilter="mypositionFilter()"
        @favouritesFilter="favouritesFilter()"
        @removeFilter="removeFilter()"
      />
    </div>
    <section class="board">
      <div class="container container--narrow" v-cloak>
        <div class="table v-cloak-hidden" role="grid">
          <div class="table__header table__header--sticky" role="row toolbar">
            <div class="table__cell table__cell--position" role="columnheader">
              Position
            </div>

            <div class="table__cell table__cell--user" role="columnheader">
              <div
                class="table__cell table__cell--position"
                role="columnheader"
              >
                Nickname
              </div>
            </div>

            <div
              class="table__cell table__cell--points table__cell--small"
              role="columnheader"
            >
              <SortButton
                :class-names="filterByF"
                :sortF="sortF"
                v-bind:style="[
                  sortF === 'DESC'
                    ? { color: '#E3242B' }
                    : { color: '#03C04A' },
                ]"
                @clicked="fetchSorted()"
                >{{ criteriumName }}</SortButton
              >
            </div>
          </div>
          <transition-group
            class="table__body"
            id="sortable"
            name="list"
            tag="div"
            role="rowgroup"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
          >
            <div
              v-for="(userObject, i) in filteredUsers"
              :key="i"
              :data-index="i"
              class="table__row"
              v-bind:style="[
                !userObject.isFinished ? { background: '#5FC663' } : {},
                userObject.nickname == userDetails.nickname
                  ? { background: '#FA8072' }
                  : {},
              ]"
              role="row"
            >
              <div
                v-if="userObject.nickname != userDetails.nickname"
                class="table__cell table__cell--favourite"
                role="gridcell"
              >
                <button
                  class="favourite_button"
                  v-if="isFavourite(userObject.nickname)"
                  @click.prevent="removeFromFavourite(userObject.nickname)"
                >
                  <i id="icon" class="fas fa-star text-yellow-300 fa-2x"></i>
                </button>
                <button
                  class="favourite_button"
                  v-else
                  @click.prevent="addToFavourite(userObject.nickname)"
                >
                  <i id="icon" class="far fa-star text-yellow-300 fa-2x"></i>
                </button>
                {{ userObject.rank }}
              </div>
              <div
                v-if="userObject.nickname == userDetails.nickname"
                class="table__cell table__cell--favourite"
                role="gridcell"
              >
                <button class="favourite_button">
                  <i id="icon" class="fas fa-user text-black-300 fa-2x"></i>
                </button>
                {{ userObject.rank }}
              </div>
              <div class="table__cell table__cell--user" role="gridcell">
                <div class="user__avatar">
                  <img src="@/assets/default_profile_picture.png" alt="" />
                </div>
                <button
                  class="user__name user__name--no-margin"
                  type="button"
                  @click="showUserCard(userObject.gameId, i)"
                >
                  {{ userObject.nickname }}
                </button>
              </div>

              <div
                v-if="criterium === 'totalScore'"
                class="table__cell table__cell--points"
                role="gridcell"
                :key="users"
              >
                {{ userObject.totalScore }}
              </div>
              <div
                v-if="criterium === 'enemiesKilled'"
                class="table__cell table__cell--points"
                role="gridcell"
                :key="users"
              >
                {{ userObject.enemiesKilled }}
              </div>
              <div
                v-if="criterium === 'gatheredStars'"
                class="table__cell table__cell--points"
                role="gridcell"
                :key="users"
              >
                {{ userObject.gatheredStars }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- DETAILED VIEW -->
    <Modal
      :username="users[this.activeUser].nickname"
      :showModal="showModal"
      :gameDetail="gameDetail"
      :userData="userDetails"
      aria-label="User card"
      @close="closeModal()"
    >
    </Modal>
  </div>
</template>
>

<style scoped>
* {
  box-sizing: inherit;
}

button {
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  user-select: none;
}

button:focus {
  outline: thin dotted;
}

.toolbar {
  white-space: nowrap;
}

.searchFilter {
  display: inline-block;
}

.criteriaFilter {
  display: inline-block;
  margin-right: 2%;
}

.dropdownFilter {
  display: inline-block;
}

.favourite_button {
  size: 200%;
  padding-right: 30%;
}

.page__header,
.page__footer {
  background-color: var(--sidebar-item-hover);
  padding: 0.6rem 0;
  text-align: center;
}

.page__footer {
  bottom: 0;
  padding: 0.5rem 0;
  position: fixed;
  width: 100%;
  z-index: 9;
}

.page__title {
  font-size: 2rem;
  color: white;
  font-weight: 600;
  margin: 0;
}

.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  width: 100%;
}

.container--narrow {
  max-width: 800px;
  padding: 0;
}

.table {
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 7rem);
  width: 100%;
}

.table__header,
.table__row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

.table__header--sticky {
  box-shadow: 1px 12px 20px -16px rgba(0, 0, 0, 0.2);
  flex: 0 0 auto;
}

.table__body {
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: scroll;
}

.table__row:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.01);
}

.table__cell--favourite {
  padding-right: 9.5%;
}

.table__cell {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  width: 33.33333%;
}

.table__cell--user {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  font-size: 1.25rem;
  font-weight: 300;
}

.table__cell--small {
  font-size: 0.825rem;
}

.user__avatar {
  border-radius: 50%;
  height: 64px;
  overflow: hidden;
  position: relative;
  width: 64px;
  z-index: 9;
}

.user__avatar--large {
  height: 128px;
  margin-bottom: 1rem;
  width: 128px;
}

.user__avatar img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in;
  width: 100%;
}

.user__avatar:hover img {
  filter: blur(1px) brightness(0.75);
  transform: scale(1.05);
}

.user__name {
  background-color: transparent;
  border: 0;
  font-weight: 400;
  margin: 0 auto 1rem;
}

.user__name--no-margin {
  margin: 0;
}

.user__name--large {
  font-size: 1.25rem;
}

.user {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.modal,
.modal__overlay {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;
}

.modal {
  align-items: center;
  display: flex;
  justify-content: center;
}

.modal__overlay {
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.3s ease-in-out;
}

.modal__wrapper {
  align-items: center;
  background-color: #eeeff0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 480px;
  padding: 1rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.75, -0.15, 0.5, 2);
  transition-delay: 0.1s;
  width: 90%;
  z-index: 100;
}

.modal__close {
  align-items: baseline;
  background-color: #eeeff0;
  border: 0;
  border-radius: 50%;
  display: flex;
  font-size: 2rem;
  height: 2.5rem;
  justify-content: center;
  line-height: 1rem;
  margin: 0;
  padding: 0;
  position: absolute;
  right: -0.75rem;
  top: -0.75rem;
  transition: transform 0.2s cubic-bezier(0.75, -0.15, 0.5, 2);
  width: 2.5rem;
}

.modal__close:hover {
  transform: scale(1.25);
}

.modal-enter .modal__overlay,
.modal-leave-to .modal__overlay {
  opacity: 0;
}

.modal-enter .modal__wrapper,
.modal-leave-to .modal__wrapper {
  opacity: 0;
  transform: scale(0.75);
}

.list-enter-active {
  transition: opacity 0.3s ease-in-out,
    transform 0.3s cubic-bezier(0.6, 0.2, 0.6, 0.9);
}

@media (min-width: 620px) {
  .table__cell--user {
    flex-basis: auto;
    flex-direction: row;
    font-size: 1rem;
    font-weight: 400;
    justify-content: flex-start;
    padding-left: 1rem;
  }

  .table__header .table__cell--points {
    font-size: 1rem;
  }

  .user__avatar {
    margin-right: 1rem;
  }
}
</style>
