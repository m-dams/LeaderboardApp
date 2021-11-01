<template>
  <div class="myprogress">
    <h1>This is My Progress page</h1>
    <button class="notification-button">Notification</button>
  </div>
</template>

<script>
export default {
  name: "myprogress",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      success: false,
    };
  },
  methods: {},
};
</script>
