<template>
  <transition name="modal" mode="in-out" v-if="showModal">
    <div>
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
              <h3 class="text-3xl font-semibold">{{ username }}</h3>
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
              <p>TIP: The percentages are the ratio of your best stats</p>
              <p>to given player's stats.</p>
              <br />
              <div class="divStars">
                <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Best gathered stars: {{ gameDetail.gatheredStars }} =>
                </p>
                <p
                  class="my-41 text-blueGray-500 text-lg leading-relaxed"
                  :key="gatheredStarsR"
                  v-bind:style="[
                    gatheredStarsR >= 0
                      ? { color: '#228B22' }
                      : { color: '#B90E0A' },
                  ]"
                >
                  {{ gatheredStarsR }}%
                </p>
              </div>
              <div class="divMelee">
                <p class="my-5 text-blueGray-500 text-lg leading-relaxed">
                  best Enemies Killed By Melee:
                  {{ gameDetail.enemiesType1KilledByMelee }} =>
                </p>
                <p
                  class="my-51 text-blueGray-500 text-lg leading-relaxed"
                  :key="killedByMeleeR"
                  v-bind:style="[
                    killedByMeleeR >= 0
                      ? { color: '#228B22' }
                      : { color: '#B90E0A' },
                  ]"
                >
                  {{ killedByMeleeR }}%
                </p>
              </div>
              <div class="divDistance">
                <p class="my-6 text-blueGray-500 text-lg leading-relaxed">
                  Best Enemies Killed from distance:
                  {{ gameDetail.enemiesType1KilledFromDistance }} =>
                </p>
                <p
                  class="my-61 text-blueGray-500 text-lg leading-relaxed"
                  :key="killedFromDistanceR"
                  v-bind:style="[
                    killedFromDistanceR >= 0
                      ? { color: '#228B22' }
                      : { color: '#B90E0A' },
                  ]"
                >
                  {{ killedFromDistanceR }}%
                </p>
              </div>
              <div class="divTime">
                <p class="my-7 text-blueGray-500 text-lg leading-relaxed">
                  Best Total Score: {{ gameDetail.totalScore }} =>
                </p>
                <p
                  class="my-71 text-blueGray-500 text-lg leading-relaxed"
                  :key="totalScoreR"
                  v-bind:style="[
                    totalScoreR >= 0
                      ? { color: '#228B22' }
                      : { color: '#B90E0A' },
                  ]"
                >
                  {{ totalScoreR }}%
                </p>
              </div>
              <div class="divLife">
                <p class="my-7 text-blueGray-500 text-lg leading-relaxed">
                  Best gathered life points:
                  {{ gameDetail.gatheredLifePoints }} =>
                </p>
                <p
                  class="my-71 text-blueGray-500 text-lg leading-relaxed"
                  :key="lifePointsR"
                  v-bind:style="[
                    lifePointsR >= 0
                      ? { color: '#228B22' }
                      : { color: '#B90E0A' },
                  ]"
                >
                  {{ lifePointsR }}%
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
    username: String,
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      gatheredStarsR: 1,
      totalScoreR: 1,
      killedByMeleeR: 1,
      killedFromDistanceR: 1,
      lifePointsR: 1,
    };
  },
  watch: {
    gameDetail: function () {
      this.calculateRatio();
    },
  },
  methods: {
    mounted: function () {
      this.$refs.closeButton.focus();
    },
    calculateRatio: function () {
      if (this.userData.bestGatheredStars && this.gameDetail.gatheredStars) {
        this.gatheredStarsR = Math.round(
          (this.userData.bestGatheredStars / this.gameDetail.gatheredStars) *
            100 -
            100
        );
      }
      if (
        this.userData.bestType1EnemiesKilledByMelee &&
        this.gameDetail.enemiesType1KilledByMelee
      ) {
        this.killedByMeleeR = Math.round(
          (this.userData.bestType1EnemiesKilledByMelee /
            this.gameDetail.enemiesType1KilledByMelee) *
            100 -
            100
        );
      }
      if (
        this.userData.bestType1EnemiesKilledFromDistance &&
        this.gameDetail.enemiesType1KilledFromDistance
      ) {
        this.killedFromDistanceR = Math.round(
          (this.userData.bestType1EnemiesKilledFromDistance /
            this.gameDetail.enemiesType1KilledFromDistance) *
            100 -
            100
        );
      }
      if (this.userData.besttotalScore && this.gameDetail.totalScore) {
        this.totalScoreR = Math.round(
          (this.userData.besttotalScore / this.gameDetail.totalScore) * 100 -
            100
        );
      }
      if (
        this.userData.bestGatheredLifePoints &&
        this.gameDetail.gatheredLifePoints
      ) {
        this.lifePointsR = Math.round(
          (this.userData.bestGatheredLifePoints /
            this.gameDetail.gatheredLifePoints) *
            100 -
            100
        );
      }
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
