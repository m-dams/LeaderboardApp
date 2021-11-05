<template>
  <div>
    <main>
      <section class="fixed w-11/12 h-full">
        <div
          class="absolute top-0 w-full h-full bg-white-500"
          style="background-size: 100%; background-repeat: no-repeat"
          :style="{}"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4 z-10">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  w-full
                  mb-6
                  shadow-lg
                  rounded-lg
                  bg-green-300
                  border-0
                "
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with credentials
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center"></div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div class="relative w-full mb-3">
                      <label
                        class="
                          block
                          uppercase
                          text-gray-700 text-xs
                          font-bold
                          mb-2
                        "
                        for="grid-password"
                        >Email</label
                      ><input
                        id="email-input"
                        type="email"
                        class="
                          border-0
                          px-3
                          py-3
                          placeholder-gray-400
                          text-gray-700
                          bg-white
                          rounded
                          text-sm
                          shadow
                          focus:outline-none focus:ring
                          w-full
                        "
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="
                          block
                          uppercase
                          text-gray-700 text-xs
                          font-bold
                          mb-2
                        "
                        for="grid-password"
                        >Password</label
                      ><input
                        id="password-input"
                        type="password"
                        class="
                          border-0
                          px-3
                          py-3
                          placeholder-gray-400
                          text-gray-700
                          bg-white
                          rounded
                          text-sm
                          shadow
                          focus:outline-none focus:ring
                          w-full
                        "
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div>
                      <label class="inline-flex items-center cursor-pointer"
                        ><input
                          id="customCheckLogin"
                          type="checkbox"
                          class="
                            form-checkbox
                            border-0
                            rounded
                            text-gray-800
                            ml-1
                            w-5
                            h-5
                          "
                          style="transition: all 0.15s ease 0s"
                        /><span class="ml-2 text-sm font-semibold text-gray-700"
                          >Remember me</span
                        ></label
                      >
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="
                          bg-gray-900
                          text-white
                          active:bg-gray-700
                          text-sm
                          font-bold
                          uppercase
                          px-6
                          py-3
                          rounded
                          shadow
                          hover:shadow-lg
                          outline-none
                          focus:outline-none
                          mr-1
                          mb-1
                          w-full
                        "
                        type="button"
                        style="transition: all 0.15s ease 0s"
                        @click.prevent="sign_in()"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex flex-wrap mt-6 z-50">
                <div class="w-1/2" @click.prevent="redirect_reset()">
                  <a href="#pablo" class="text-black-300"
                    ><small>Forgot password?</small></a
                  >
                </div>
                <div
                  class="w-1/3 text-right"
                  @click.prevent="redirect_signup()"
                >
                  <a href="#pablo" class="text-black-300"
                    ><small>Create new account</small></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { notify } from "notiwind";
import router from "../../router";
export default {
  name: "login-page",
  data() {
    return {
      message: null,
      verified: false,
      token: null,
      refreshToken: null,
      error: null,
    };
  },
  methods: {
    sign_in: async function () {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      // // At request level
      // const agent = new https.Agent({
      //   rejectUnauthorized: false
      // });
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;
      const url = "http://localhost:8080/auth/login";

      await axios
        .post(url, {
          email,
          password,
        })
        .then((response) => {
          this.message = response.data.message;
          this.verified = response.data.verified;
          this.token = response.data.token;
          this.refreshToken = response.data.refreshToken;
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          this.notify_success(this.message);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error);
            this.notify_error(error.response.data.error);
          }
        });

      if (this.verified == true) {
        router.push("Leaderboard");
      }
    },

    notify_success: function (message) {
      notify(
        {
          group: "Success",
          title: "Success",
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

    redirect_reset: function () {
      router.push("ResetPassword");
    },

    redirect_signup: function () {
      router.push("SignUp");
    },
    logout() {
      localStorage.removeItem("user");
    },
  },
};
</script>
