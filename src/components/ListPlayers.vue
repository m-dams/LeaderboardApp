<template>
  <h1>{{ users }}</h1>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    UserService.getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
  },
};
</script>
