<script>
import SidebarLink from "./SidebarLink";
import { notify } from "notiwind";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  props: { loggedIn: Boolean },
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data() {
    return {
      componentKey: false,
    };
  },
  mounted() {
    // this.logout();
    if (localStorage.getItem("token")) {
      this.componentKey = true;
    }
  },
  updated() {
    if (localStorage.getItem("token")) {
      this.componentKey = true;
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.notify_generic("You have successfully logged out");
    },
    notify_generic: function (message) {
      notify(
        {
          group: "Success",
          title: "Success",
          text: message,
        },
        3000
      );
    },
  },
};
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }" :key="loggedIn">
    <h1>
      <span v-if="collapsed">
        <div>Z</div>
        <div>P</div>
        <div>I</div>
      </span>
      <span v-else>ZPI</span>
    </h1>

    <SidebarLink v-if="loggedIn == false" to="/login" icon="fas fa-sign-in-alt"
      >Login</SidebarLink
    >
    <SidebarLink v-if="loggedIn == false" to="/signup" icon="fas fa-user-plus"
      >Register</SidebarLink
    >
    <SidebarLink v-if="loggedIn" to="/leaderboard" icon="fas fa-crown"
      >Leaderboard</SidebarLink
    >
    <SidebarLink v-if="loggedIn" to="/myprogress" icon="fas fa-chart-line"
      >My progress</SidebarLink
    >
    <SidebarLink
      v-if="loggedIn"
      @click.prevent="logout()"
      @click="$emit('loginStatus')"
      to="/login"
      icon="fas fa-sign-out-alt"
      >Sign out</SidebarLink
    >

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.7em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  font-weight: 800;
  height: 5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
