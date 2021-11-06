<template>
  <transition name="modal" mode="in-out">
    <div class="modal">
      <div class="modal__overlay" @click="$emit('close')"></div>
      <div class="modal__wrapper" role="dialog" :aria-label="ariaLabel">
        <button
          class="modal__close"
          type="button"
          aria-label="Close modal window"
          ref="closeButton"
          @click="$emit('close')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  setup() {},
  methods: {
    mounted: function () {
      this.$refs.closeButton.focus();
    },
  },
};
</script>
