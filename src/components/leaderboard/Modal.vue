<template>
  <transition name="modal" mode="in-out" v-if="showModal">
    <div>
      <button
        class="
          bg-pink-500
          text-white
          active:bg-pink-600
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
          ease-linear
          transition-all
          duration-150
        "
        type="button"
      >
        Open regular modal
      </button>
      <div
        v-if="showModal"
        class="
          overflow-x-hidden overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          justify-center
          items-center
          flex
        "
      >
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div
            class="
              border-0
              rounded-lg
              shadow-lg
              relative
              flex flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
          >
            <!--header-->
            <div
              class="
                flex
                items-start
                justify-between
                p-5
                border-b border-solid border-blueGray-200
                rounded-t
              "
            >
              <h3 class="text-3xl font-semibold">{{ userData.nickname }}</h3>
              <button
                class="
                  p-1
                  ml-auto
                  bg-transparent
                  border-0
                  text-black
                  opacity-5
                  float-right
                  text-3xl
                  leading-none
                  font-semibold
                  outline-none
                  focus:outline-none
                "
              >
                <span
                  class="
                    bg-transparent
                    text-black
                    opacity-5
                    h-6
                    w-6
                    text-2xl
                    block
                    outline-none
                    focus:outline-none
                  "
                >
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
              <div>Dane po prawej stronie to procentowa wartość ...</div>
              <div class="divStars">
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Best gathered stars: {{ userData.bestGatheredStars }}
                </p>
                <p class="my-41 text-blueGray-500 text-lg leading-relaxed">
                  10%
                </p>
              </div>
              <div class="divMelee">
                <p class="my-5 text-blueGray-500 text-lg leading-relaxed">
                  best Enemies Killed By Melee:
                  {{ userData.bestEnemiesKilledByMelee }}
                </p>
                <p class="my-51 text-blueGray-500 text-lg leading-relaxed">
                  10%
                </p>
              </div>
              <div class="divDistance">
                <p class="my-6 text-blueGray-500 text-lg leading-relaxed">
                  Best Enemies Killed from distance:
                  {{ userData.bestEnemiesKilledFromDistance }}
                </p>
                <p class="my-61 text-blueGray-500 text-lg leading-relaxed">
                  10%
                </p>
              </div>
              <div class="divTime">
                <p class="my-7 text-blueGray-500 text-lg leading-relaxed">
                  Best duration time: {{ userData.bestDurationTime }}
                </p>
                <p class="my-71 text-blueGray-500 text-lg leading-relaxed">
                  10%
                </p>
              </div>
              <div class="divLife">
                <p class="my-7 text-blueGray-500 text-lg leading-relaxed">
                  Best gathered life points:
                  {{ userData.bestGatheredLifePoints }}
                </p>
                <p class="my-71 text-blueGray-500 text-lg leading-relaxed">
                  10%
                </p>
              </div>
            </div>
            <!--footer-->
            <div
              class="
                flex
                items-center
                justify-end
                p-6
                border-t border-solid border-blueGray-200
                rounded-b
              "
            >
              <button
                class="
                  text-green-500
                  bg-transparent
                  border border-solid border-green-500
                  hover:bg-green-500 hover:text-white
                  active:bg-green-600
                  font-bold
                  uppercase
                  text-sm
                  px-6
                  py-3
                  rounded
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  ease-linear
                  transition-all
                  duration-150
                "
                type="button"
                ref="closeButton"
                @click="$emit('close')"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    gameDetail: JSON,
    userData: JSON,
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

<style scoped>
.divStars,
.divTime,
.divMelee,
.divDistance,
.divLife {
  white-space: nowrap;
}

.my-4,
.my-5,
.my-6,
.my-7,
.my-8 {
  display: inline-block;
}

.my-41,
.my-51,
.my-61,
.my-71,
.my-81 {
  display: inline-block;
  color: red;
}
</style>
