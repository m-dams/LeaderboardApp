<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import SignUpForm from "@/components/signup/SignUpFormTW";

export default {
  components: { SignUpForm },
  setup() {
    return { collapsed, toggleSidebar };
  },
};
</script>

<template>
  <SignUpForm />
</template>

<style scoped>
h1 {
  margin-top: 100px;
}
</style>
