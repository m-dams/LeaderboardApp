<template>
  <div class="myprogress">
    <button
      @click.prevent="notify()"
      class="
        bg-green-500
        text-white
        active:bg-pink-600
        font-bold
        uppercase
        text-xs
        px-4
        py-2
        rounded
        shadow
        hover:shadow-md
        outline-none
        focus:outline-none
        mr-1
        mb-1
        ease-linear
        transition-all
        duration-150
      "
      type="button"
    >
      notification
    </button>
  </div>
</template>

<script>
import { notify } from "notiwind";
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
    notify: function () {
      notify(
        {
          group: "generic",
          title: "",
          text: "Your account was registered!",
        },
        2000
      ); // 2s
    },
  },
};
</script>
