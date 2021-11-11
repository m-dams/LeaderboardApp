<script>
import UserService from "../../services/UserService.js";
import Modal from "./Modal";
// import Rank from 'Rank';
import SortButton from "./SortButton";
import Searchbar from "../searchbar/Searchbar.vue";
export default {
  data() {
    return {
      activeCamper: null,
      users: [],
      error: null,
      isFetching: true,
      order: -1,
      showModal: false,
      sortBy: "besttotalScore",
    };
  },
  name: "index",
  components: { Modal, SortButton, Searchbar },
  methods: {
    sort: function (col) {
      console.log(col);
      if (col == this.sortBy) {
        this.order *= -1;
      } else {
        this.sortBy = col;
      }
    },
    showUserCard: function (i) {
      this.showModal = true;
      this.activeCamper = i;
    },
    // updateRanks: function (campers) {
    //   const sortedByAlltime = campers
    //     .slice()
    //     .sort((a, b) => b.alltime - a.alltime);
    //   const ranks = campers
    //     .slice()
    //     .map(
    //       (camper) =>
    //         sortedByAlltime.findIndex((x) => x.alltime === camper.alltime) + 1
    //     );

    //   return campers.map((camper, index) =>
    //     Object.assign({}, camper, {
    //       rank: {
    //         alltime: ranks[index],
    //         recent: index + 1,
    //       },
    //     })
    //   );
    // },
    // handleKeydown: function (e) {
    //   if (!this.showModal || e.key !== "Escape") {
    //     return;
    //   }
    //   this.showModal = false;
    // },
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
  },

  created() {
    UserService.getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
  },
  // beforeUnmount: function () {
  //   document.removeEventListener("keydown", this.handleKeydown);
  // },

  computed: {
    sortedList: function () {
      return this.users.sort((a, b) => {
        if (this.sortBy == "nickname") {
          return a.nickname.toUpperCase() > b.nickname.toUpperCase()
            ? this.order
            : this.order * -1;
        }
        if (this.order === 1) {
          return a[this.sortBy] - b[this.sortBy];
        } else {
          return b[this.sortBy] - a[this.sortBy];
        }
      });
    },
    alltimeClass: function () {
      return {
        sort: true,
        "sort--desc": this.order === -1,
        "sort--asc": this.order === 1,
        "sort--active": this.sortBy === "besttotalScore",
      };
    },
    nicknameClass: function () {
      return {
        sort: true,
        "sort--desc": this.order === -1,
        "sort--asc": this.order === 1,
        "sort--active": this.sortBy === "nickname",
      };
    },
    // fccLink: function () {
    //   if (this.activeCamper === null) {
    //     return null;
    //   }
    //   return `https://www.freecodecamp.com/${
    //     this.campers[this.activeCamper].username
    //   }`;
    // },
    // fccLinkTitle: function () {
    //   if (this.activeCamper === null) {
    //     return null;
    //   }
    //   return `Visit ${
    //     this.campers[this.activeCamper].username
    //   } on Free Code Camp`;
    // },
    sortOrder: function () {
      return this.order === 1 ? "ascending" : "descending";
    },
  },
  filters: {
    number: function (num) {
      return new Intl.NumberFormat().format(num);
    },
    ordinal: function (num) {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    },
  },
};
</script>

<template>
  <div class="page" id="app">
    <header class="page__header">
      <h1 class="page__title">Leaderboard</h1>
    </header>
    <Searchbar v-on:search="(id) => this.showUserCard(id)" />
    <section class="board">
      <div class="container container--narrow" v-cloak>
        <div class="loader v-cloak-visible">
          <p>Let me load some data</p>
        </div>
        <div class="message message--error v-cloak-hidden" v-if="error">
          Error: {{ error }}
        </div>
        <div class="table v-cloak-hidden" role="grid" v-else>
          <div
            class="table__header table__header--sticky"
            role="row toolbar"
            aria-label="Sorting options"
            aria-controls="sortable"
          >
            <div class="table__cell table__cell--position" role="columnheader">
              Position
            </div>

            <div
              class="table__cell table__cell--user"
              role="columnheader"
              :aria-sort="sortBy === 'nickname' ? sortOrder : null"
            >
              <SortButton
                :class-names="nicknameClass"
                aria-label="Sort by nickname"
                @clicked="sort('nickname')"
                >Nickname</SortButton
              >
            </div>

            <div
              class="table__cell table__cell--points table__cell--small"
              role="columnheader"
              :aria-sort="sortBy === 'besttotalScore' ? sortOrder : null"
            >
              <SortButton
                :class-names="alltimeClass"
                aria-label="Sort by alltime points"
                @clicked="sort('besttotalScore')"
                >Total score</SortButton
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
              v-for="(userObject, i) in sortedList"
              :key="userObject.nickname"
              :data-index="i"
              class="table__row"
              role="row"
            >
              <div class="table__cell table__cell--points" role="gridcell">
                {{ i + 1 }}
              </div>
              <div class="table__cell table__cell--user" role="gridcell">
                <div class="user__avatar">
                  <img src="@/assets/default_profile_picture.png" alt="" />
                </div>
                <button
                  class="user__name user__name--no-margin"
                  type="button"
                  @click="showUserCard(i)"
                >
                  {{ userObject.nickname }}
                </button>
              </div>

              <div class="table__cell table__cell--points" role="gridcell">
                {{ userObject.besttotalScore }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- DETAILED VIEW -->
    <Modal
      :showModal="showModal"
      :userData="users[activeCamper]"
      aria-label="User card"
      @close="showModal = false"
    >
      <div class="user">
        <div class="user__avatar user__avatar--large">
          <img src="@/assets/default_profile_picture.png" />
        </div>
        <h3 class="user__name user__name--large"></h3>
        <div class="user__ranks">
          <div class="rank">
            <h4 class="rank__title">Alltime</h4>
            <div class="rank__points">
              <span class="rank__label">points</span>
            </div>
          </div>
          <div class="rank">
            <h4 class="rank__title">Recent</h4>
            <div class="rank__points">
              <span class="rank__label">points</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
>

<style scoped>
* {
  box-sizing: inherit;
}

html,
body {
  height: 100%;
}

body {
  background-color: #eeeff0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.6);
  font-family: "Open Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  overflow-x: hidden;
  position: relative;
}

a {
  border-bottom: 1px solid transparent;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  transition: color 0.3s ease-in-out, border 0.3s ease-in-out;
}

a:hover {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.75);
}

a[target="_blank"]::after {
  bottom: -1px;
  /* content: url(link.svg); */
  margin-left: 0.25rem;
  position: relative;
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

.page__header,
.page__footer {
  background-color: var(--sidebar-item-hover);
  padding: 1rem 0;
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
  font-size: 2.5rem;
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

.sort {
  align-items: center;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100%;
}

.sort--active {
  color: rgba(0, 0, 0, 0.8);
}

.sort path {
  fill: #ccc;
  transform-origin: center;
  transition: fill 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.sort--desc.sort--active path:last-child,
.sort--asc.sort--active path:first-child {
  fill: #555;
  transform: scale(1.25);
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

.user__ranks {
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.rank {
  flex-basis: 50%;
  text-align: center;
}

.rank__title {
  font-size: 1.25rem;
  font-weight: 400;
  margin: 1rem auto;
}

.rank__points {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.375rem;
}

.rank__label {
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.copyright {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1rem;
  margin: 0;
}

.message {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
  width: 50%;
}

.message--error {
  background-color: #e53935;
  border: 1px solid #d32f2f;
}

.loader {
  display: none;
  text-align: center;
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

[v-cloak] .v-cloak-visible {
  display: block;
}

[v-cloak] .v-cloak-hidden {
  display: none;
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

  .user__avatar--large {
    margin-right: 0;
  }
}
</style>
