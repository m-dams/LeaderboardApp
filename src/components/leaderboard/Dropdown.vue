<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-6/12 md:w-full px-4">
      <div class="relative inline-flex align-middle w-full">
        <button
          class="
            text-white
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none
            mr-1
            mb-1
            bg-green-600
            ease-linear
            transition-all
            duration-150
            font-normal
            px-6
            py-2
            rounded
            outline-none
            focus:outline-none
            mr-1
            mb-1
            capitalize
            w-full
          "
          style="min-width: 10rem"
          type="button"
          v-on:click="toggleDropdown()"
          ref="btnDropdownRef"
        >
          Change criteria
        </button>
        <div
          v-bind:class="{
            hidden: !dropdownPopoverShow,
            block: dropdownPopoverShow,
          }"
          class="
            bg-white
            text-base
            z-50
            float-left
            py-2
            list-none
            text-left
            rounded
            shadow-lg
            mt-1
          "
          style="min-width: 10rem"
          ref="popoverDropdownRef"
        >
          <a
            @click="$emit('changeToStars')"
            href="#pablo"
            class="
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-blueGray-700
            "
            v-on:click="toggleDropdown()"
          >
            Gathered stars
          </a>
          <div
            class="
              h-0
              my-2
              border border-solid border-t-0 border-blueGray-800
              opacity-25
            "
          ></div>
          <a
            @click="$emit('changeToKilled')"
            href="#pablo"
            class="
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-blueGray-700
            "
            v-on:click="toggleDropdown()"
          >
            Killed enemies
          </a>
          <div
            class="
              h-0
              my-2
              border border-solid border-t-0 border-blueGray-800
              opacity-25
            "
          ></div>
          <a
            @click="$emit('changeToScore')"
            href="#pablo"
            class="
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-blueGray-700
            "
            v-on:click="toggleDropdown()"
          >
            Total score
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  name: "dropdown",
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
