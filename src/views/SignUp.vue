<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import SignUpForm from "@/components/signup/SignUpForm";

export default {
  components: { SignUpForm },
  setup() {
    return { collapsed, toggleSidebar };
  },
};
</script>

<template>
  <h1>SignUp form</h1>
  <SignUpForm />
</template>
