<script>
export default {
  props: {
    size: {
      type: String,
      default: "24px",
    },
    color: {
      type: String,
      default: "#ccc",
    },
    classNames: {
      type: Object,
      default: () => ({
        sort: true,
      }),
    },
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  components: {},
  setup() {
    return {};
  },

  methods: {
    handleClick: function (e) {
      this.$emit("clicked", e);
    },
  },
};
</script>

<template>
  <button :class="classNames" :aria-label="ariaLabel" @click="handleClick">
    <slot></slot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      :width="size"
      :height="size"
      viewBox="0 0 16 16"
    >
      <path :fill="color" d="M11 7h-6l3-4z" />
      <path :fill="color" d="M5 9h6l-3 4z" />
    </svg>
  </button>
</template>

<style scoped>
.sort {
  align-items: center;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100%;
}

.sort--active {
  color: rgba(60, 179, 113, 0.8);
}

.sort path {
  fill: #ccc;
  transform-origin: center;
  transition: fill 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.sort--desc.sort--active path:last-child,
.sort--asc.sort--active path:first-child {
  fill: #008000;
  transform: scale(1.25);
}
</style>
