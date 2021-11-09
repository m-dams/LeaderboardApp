<template>
  <div class="home"></div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "Home",
  components: {},
  async created() {
    await UserService.getToken().then((response) => {
      console.log(response.data);
    });
  },
};
</script>
