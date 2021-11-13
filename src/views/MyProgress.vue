<template>
  <header class="page__header">
    <h1 class="page__title">My progress</h1>
  </header>
  <div id="myprogress">
    <highcharts
      v-bind:options="chart1"
      :header="statistic"
      catchLegendEvents="true"
    />
  </div>
  <options
    style="min-width: 16rem"
    class="statisticOptions"
    @gatheredStars="statistic = 'Gathered Stars'"
  ></options>
</template>

<script>
import Chart from "../components/chart/Chart";
import Dropdown from "../components/chart/DropdownOptions";
export default {
  name: "MyProgress",
  components: {
    options: Dropdown,
    highcharts: Chart,
  },
  data() {
    return {
      statistic: "",
      chart1: {
        yAxis: {
          title: {
            text: "Gathered stars",
          },
        },
        series: [
          {
            data: [
              [1356598400000, 151],
              [1356598410000, 52],
              [1362096000000, 10],
              [1364774400000, 56],
              [1367366400000, 45],
              [1370044800000, 11],
              [1372636800000, 52],
              [1375315200000, 54],
              [1377993600000, 32],
              [1380585600000, 76],
              [1383264000000, 87],
              [1385856000000, 54],
              [1388534400000, 65],
              [1391212800000, 22],
              [1393632000000, 71],
              [1396310400000, 25],
              [1398902400000, 65],
              [1401580800000, 42],
              [1404172800000, 84],
              [1406851200000, 46],
              [1412121600000, 10],
              [1414800000000, 2],
              [1417392000000, 90],
              [1420070400000, 63],
              [1422748800000, 74],
            ],
          },
        ],
      },
      chart2: {
        yAxis: {
          title: {
            text: "DurationTime 2",
          },
        },
        series: [
          {
            data: [
              [1356998400000, 151],
              [1359676800000, 52],
              [1362096000000, 10],
              [1364774400000, 56],
              [1367366400000, 45],
              [1370044800000, 11],
              [1372636800000, 52],
              [1375315200000, 54],
              [1377993600000, 32],
              [1380585600000, 76],
              [1383264000000, 87],
              [1385856000000, 54],
              [1388534400000, 65],
              [1391212800000, 22],
              [1393632000000, 71],
              [1396310400000, 25],
              [1398902400000, 65],
              [1401580800000, 42],
              [1404172800000, 84],
              [1406851200000, 46],
              [1412121600000, 10],
              [1414800000000, 2],
              [1417392000000, 90],
              [1420070400000, 63],
              [1422748800000, 74],
            ],
          },
        ],
      },
    };
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
</style>
