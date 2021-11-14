<template>
  <div>
    <h1 class="chart__title">{{ header }}</h1>
    <highcharts
      :options="chartOptions"
      ref="lineCharts"
      :constructor-type="'stockChart'"
    ></highcharts>
  </div>
</template>

<script>
//  formatDate(dateString) {
//     let convertedDate = new Date(dateString);
//     return convertedDate.toDateString();
//   },
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";

stockInit(Highcharts);

export default {
  props: ["header", "options", "catchLegendEvents", "userData"],
  components: {
    highcharts: Chart,
  },
  created() {},

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

      chartOptions: Highcharts.merge(this.options, {
        chart: {
          zoomType: "x",
          type: "line",
          height: 500,
        },
        xAxis: {
          type: "datetime",
        },
      }),
    };
  },
};
</script>

<style scoped>
.chart__title {
  font-size: 2rem;
  color: black;
  font-weight: 600;
  margin: 0;
}
</style>
