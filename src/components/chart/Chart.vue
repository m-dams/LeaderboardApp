<template>
  <div>
    <h1>{{ header }}</h1>
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
  props: ["header", "options", "catchLegendEvents"],
  components: {
    highcharts: Chart,
  },
  created() {},

  data() {
    return {
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
