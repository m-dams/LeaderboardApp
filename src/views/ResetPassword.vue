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
            <div class="w-full lg:w-4/12 px-4 z-0">
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
                      Change password
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
                        v-model="email"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        @click="reset_password()"
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
                      >
                        Change password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex flex-wrap mt-6 z-50">
                <div
                  class="w-full text-center"
                  @click.prevent="redirect_login()"
                >
                  <a class="text-black-300" href="#pablo"
                    ><small>Do you want to log in?</small></a
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
import { notify } from "notiwind";
import router from "../router";
import UserService from "../services/UserService";
export default {
  name: "login-page",
  components: {},
  data() {
    return {
      email: "",
    };
  },
  methods: {
    reset_password: function () {
      UserService.postResetPassword(this.email)
        .then((response) => {
          console.log(response);
          this.notify_success(
            "Link for password reset has been sent to your email"
          );
          this.redirect_login();
        })
        .catch((err) => {
          this.error = err.message;
          console.error(err.message);
        });
    },
    redirect_login: function () {
      router.push("Login");
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
  },
};
</script>
