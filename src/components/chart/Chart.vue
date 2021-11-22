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
            name: "",
            data: [],
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
