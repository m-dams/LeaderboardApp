<template>
  <h1>The sidebar is {{ collapsed ? "closed" : "open" }}</h1>
  <button @click="toggleSidebar">Toggle Sidebar</button>
  <div class="flex flex-wrap mt-6">
    <div class="w-1/2" @click.prevent="redirect_reset()">
      <a href="#pablo" class="text-black-300"
        ><small>Forgot password?</small></a
      >
    </div>
    <div class="w-1/3 text-right">
      <a href="#pablo" class="text-black-300"
        ><small>Create new account</small></a
      >
    </div>
  </div>
</template>

<script>
import router from "../router";
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
export default {
  setup() {
    return { collapsed, toggleSidebar };
  },
  methods: {
    redirect_reset: function () {
      router.push("ResetPassword");
    },

    redirect_signup: function () {
      router.push("SignUp");
    },
  },
};
</script>
