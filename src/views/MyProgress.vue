<template>
  <header class="page__header">
    <h1 class="page__title">My progress</h1>
  </header>
  <div id="myprogress">
    <highcharts
      v-bind:options="chart1"
      :key="serializedData"
      :header="statistic"
      :userData="userData"
      catchLegendEvents="true"
    />
  </div>
  <options
    style="min-width: 16rem"
    class="statisticOptions"
    @changeToGatheredStars="changeStatistic('Gathered stars')"
    @changeToKilled="changeStatistic('Killed enemies')"
    @changeToTotalScore="changeStatistic('Points gathered')"
    @changeToLifePoints="changeStatistic('Gathered life points')"
    @changeToKilledByMelee="changeStatistic('Emeies killed by mellee')"
    @changeToKilledFromDistance="
      changeStatistic('Enemies killed from distance')
    "
    @changeToGameDuration="changeStatistic('Game duration[s]')"
  ></options>
  <div class="averageStatistics">
    <div class="box-1 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/killed.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Killed Enemies</h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestType1EnemiesKilledFromDistance }}
        </h2>
      </div>
    </div>
    <div class="box-2 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/star.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Gathered Stars</h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestGatheredStars }}
        </h2>
      </div>
    </div>
    <div class="box-3 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/points.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Total Points</h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.besttotalScore }}
        </h2>
      </div>
    </div>
    <div class="box-4 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/heart.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">
          Gathered Life Points
        </h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestGatheredLifePoints }}
        </h2>
      </div>
    </div>
    <div class="box-5 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/distance.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">
          Killed from Distance
        </h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestType1EnemiesKilledFromDistance }}
        </h2>
      </div>
    </div>
    <div class="box-6 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/sword.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Killed in Melee</h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestType1EnemiesKilledByMelee }}
        </h2>
      </div>
    </div>
    <div class="box-7 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="@/assets/time.png"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Time in Game</h2>
        <br />
        <h2 class="text-gray-800 text-6xl font-semibold">
          {{ userData.bestGatheredStars }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "../components/chart/Chart";
import UserService from "../services/UserService";
import Dropdown from "../components/chart/DropdownOptions";
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
export default {
  name: "MyProgress",
  components: {
    options: Dropdown,
    highcharts: Chart,
  },
  setup() {
    return { collapsed, toggleSidebar };
  },
  data() {
    return {
      statistic: "Gathered Stars",
      timestamp: [],
      value: [],
      gameRecord: [],
      allGames: [],
      serializedData: [],
      userData: JSON,
      chart1: {
        yAxis: {
          title: {
            text: "Gathered stars",
          },
        },
        series: [
          {
            data: [],
          },
        ],
      },
    };
  },
  async created() {
    await UserService.getUserDetails()
      .then((response) => {
        this.userData = response.data;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
    await UserService.getUserGames(1000, 0)
      .then((response) => {
        this.allGames = response.data;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
    console.log(this.allGames);
    this.value = this.allGames.map((e) => e.gatheredStars);
    this.serializeData();
  },
  methods: {
    changeStatistic: function (stat) {
      this.serializedData = [];
      this.statistic = stat;
      this.chart1.yAxis.title.text = stat;
      switch (stat) {
        case "Gathered stars":
          this.value = this.allGames.map((e) => e.gatheredStars);
          break;
        case "Killed enemies":
          this.value = this.allGames.map(
            (e) => e.bestType1EnemiesKilledByMelee
          );
          break;
        case "Points gathered":
          this.value = this.allGames.map((e) => e.totalScore);
          break;
        case "Gathered life points":
          this.value = this.allGames.map((e) => e.gatheredLifePoints);
          break;
        case "Emeies killed by mellee":
          this.value = this.allGames.map(
            (e) => e.bestType1EnemiesKilledByMelee
          );
          break;
        case "Enemies killed from distance":
          this.value = this.allGames.map(
            (e) => e.bestType1EnemiesKilledFromDistance
          );
          break;
        case "Game duration[s]":
          this.value = this.allGames.map((e) => e.durationTime);
          break;
        default:
          this.value = this.allGames.map((e) => e.gatheredStars);
      }
      this.serializeData();
    },
    serializeData: function () {
      console.log("all games length " + this.allGames.length);
      this.timestamp = this.allGames.map((e) => e.date);

      for (let i = 0; i < this.allGames.length; i++) {
        this.gameRecord = [];
        this.gameRecord.push(Number(this.timestamp[i]));
        this.gameRecord.push(this.value[i]);
        this.serializedData.push(this.gameRecord);
      }

      this.chart1.series[0].data = this.serializedData;
      this.chart1.series[0].name = this.statistic;
    },
  },
};
</script>

<style>
#MyProgress {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.page__header {
  background-color: var(--sidebar-item-hover);
  padding: 1rem 0;
  text-align: center;
}

.page__title {
  font-size: 2.5rem;
  color: white;
  font-weight: 600;
  margin: 0;
}

.statisticOptions {
  width: 14.7%;
  margin-left: auto;
  margin-right: auto;
}

.averageStatistics {
  display: inline-block;
}

.box-1,
.box-2,
.box-3,
.box-4,
.box-5,
.box-6,
.box-7 {
  display: inline-block;
  margin-right: 3%;
}
</style>
