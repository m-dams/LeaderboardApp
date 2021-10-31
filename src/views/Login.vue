<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import Login from "@/components/login/LoginForm";

export default {
  components: { Login },
  setup() {
    return { collapsed, toggleSidebar };
  },
};

// export default function authHeader() {
//   let user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken) {
//     return { Authorization: 'Bearer ' + user.accessToken };
//   } else {
//     return {};
//   }
// }
</script>

<template>

  <h1>Login form</h1>
  <Login />
</template>
