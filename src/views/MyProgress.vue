<template>
  <div class="myprogress">
    <h1>This is My Progress page</h1>
    <button class="notification-button" @click.prevent="push_notification()">
      Notification
    </button>
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
  methods: {
    push_notification: function () {
      this.$notify(
        {
          group: "foo",
          title: "Success",
          text: "Your account was registered!",
        },
        2000
      ); // 2s
    },
  },
};
</script>
