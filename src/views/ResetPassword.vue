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
                        >New Password</label
                      ><input
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
                        placeholder="New password"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div></div>
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
                  <a href="#pablo" class="text-black-300"
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
// import axios from "axios";
import { notify } from "notiwind";
import router from "../router";
export default {
  name: "login-page",
  components: {},
  methods: {
    notify_success: function () {
      notify(
        {
          group: "Success",
          title: "Success",
          text: this.message,
        },
        2000
      );
    },
    redirect_login: function () {
      router.push("Login");
    },
  },
};
</script>
