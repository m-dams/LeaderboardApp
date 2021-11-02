<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import Login from "@/components/login/LoginFormTW";

export default {
  components: { Login },
  setup() {
    return { collapsed, toggleSidebar };
  },
};
</script>

<template>
  <Login />
</template>
