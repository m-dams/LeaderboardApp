<script>
import Sidebar from "@/components/sidebar/Sidebar";
import UserService from "./services/UserService";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  data() {
    return {
      pullRefreshToken: null,
      loggedIn: false,
    };
  },
  components: { Sidebar },
  setup() {
    return { sidebarWidth };
  },
  mounted() {
    this.emitter.on("justLoggedIn", (status) => {
      this.loggedIn = status;
    });
  },
  created() {
    var token = localStorage.getItem("token");
    if (token) {
      this.loggedIn = true;
      UserService.setHeader(token);
    }
    this.pullRefreshToken = setInterval(() => {
      this.fetchToken();
    }, 1000000);
  },
  methods: {
    fetchToken: async function () {
      await UserService.postRefreshToken()
        .then((response) => {
          this.token = response.data.token;
          console.log("token: " + this.token);
          if (this.token) {
            localStorage.setItem("token", JSON.stringify(this.token));
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error);
          }
        });
    },
    loginStatus: function () {
      if (this.loggedIn == true) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    },
  },
  unmounted() {
    clearInterval(this.pullRefreshToken);
  },
};
</script>

<template>
  <NotificationGroup group="Success">
    <div
      class="
        fixed
        inset-0
        flex
        items-start
        justify-end
        p-6
        px-4
        py-6
        z-30
        pointer-events-none
      "
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="
              flex
              w-full
              max-w-sm
              mx-auto
              mt-4
              overflow-hidden
              bg-white
              rounded-lg
              shadow-md
            "
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="flex items-center justify-center w-12 bg-green-500">
              <svg
                class="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                />
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-green-500">{{
                  notification.title
                }}</span>
                <p class="text-sm text-gray-600">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <NotificationGroup group="error">
    <div
      class="
        fixed
        inset-0
        flex
        items-start
        justify-end
        p-6
        px-4
        py-6
        z-30
        pointer-events-none
      "
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="
              flex
              w-full
              max-w-sm
              mx-auto
              mt-4
              overflow-hidden
              bg-white
              rounded-lg
              shadow-md
            "
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="flex items-center justify-center w-12 bg-red-500">
              <svg
                class="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                />
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-red-500">{{
                  notification.title
                }}</span>
                <p class="text-sm text-gray-600">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <NotificationGroup group="generic">
    <div
      class="
        fixed
        inset-0
        flex
        items-start
        justify-end
        p-6
        px-4
        py-6
        z-30
        pointer-events-none
      "
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="
              flex
              w-full
              max-w-sm
              mx-auto
              mt-4
              overflow-hidden
              bg-white
              rounded-lg
              shadow-md
            "
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="flex items-center justify-center w-12 bg-blue-500">
              <svg
                class="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
                />
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-blue-500"
                  >{{ notification.title }}Info</span
                >
                <p class="text-sm text-gray-600">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
  <Sidebar :loggedIn="loggedIn" @loginStatus="loginStatus()" />
  <div class="content" :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>
<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: 0.3s ease;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  transition: 0.3s ease;
}
</style>
