<template>
  <v-card class="chart-wrapper-card" :loading="loading">
    <div
      class="settings"
      @mouseover="onSettingsIconHover"
      @mouseleave="onSettingsIconHover"
    >
      <div class="settings-icon">
        <Settings v-bind="props">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-cog-outline</v-icon>
            </v-btn>
          </template>
        </Settings>
      </div>
    </div>

    <VueHighcharts
      v-show="chartType == 'line'"
      class="data-chart"
      ref="lineref"
      :options="lineConfig"
    />

    <VueHighcharts
      v-show="chartType == 'column'"
      class="data-chart"
      ref="columnref"
      :options="columnChartConfig"
    />
  </v-card>
</template>


<script setup>
import Settings from "./Settings.vue";

import {
  ref,
  onMounted,
  watch,
  defineProps,
  computed,
} from "@nuxtjs/composition-api";

import { getConfig } from "./config.js";
import { columnConfigDefault } from "./columnConfigDefault";

import { addSeriesToChart } from "./chart.js";
import dayjs from "dayjs";

const props = defineProps({
  chart: Object,
  index: Number,
});

const loading = ref(false);

const lineref = ref(null);
const columnref = ref(null);

const chartType = computed(() => props.chart.type);

// const chartProp = computed(() => props.chart);

const lineChart = computed(() => props.chart.agg);
const columnChart = computed(() => props.chart.columnagg);

const tooltipFormatter = function () {
  const humanReadableSensorNames = {
    humi: "Humidity",
    temp: "Temperature",
    light: "Light",
  };

  const line = lineChart.value[this.series.name];

  if (!line) return;

  const { mac } = line.sensor;

  const sensorKind = humanReadableSensorNames[this.series.name.split("_")[1]];
  const timestamp = dayjs(this.x).format("DD MMM YYYY HH:mm:ss");

  return `<div>${sensorKind}(${mac}) : <b>${this.y}</b></div> <br/> <div>Timestamp: ${timestamp}</div>`;
};

const lineConfig = { ...getConfig(), tooltip: { formatter: tooltipFormatter } };

columnConfigDefault.tooltip.formatter = function () {
  const indx = this.series.xAxis.categories.findIndex((c) => c === this.x);

  const nextCategory = this.series.xAxis.categories[indx + 1];

  const foundSeries = columnChart.series.find(
    (ss) => ss.name == this.series.name
  );

  if (!foundSeries) {
    return;
  }

  const { mac } = foundSeries.sensor;

  const sensorKindKey = this.series.name.split("_")[1];

  const timestamp = dayjs(this.x).format("DD MMM YYYY HH:mm:ss");
  const to = dayjs(nextCategory).format("DD MMM YYYY HH:mm:ss");

  return `
    <div>Max Value of ${sensorKindKey} (${mac}) is <b>${this.y}</b></div> 
    <br/>
    <div>Interval from <b>${timestamp}</b> to <b>${to}</b></div>
  `;
};

const columnChartConfig = columnConfigDefault;

const handleLineChartChange = () => {
  for (const key in lineChart.value) {
    const foundseries = lineref.value.chart.series.find((s) => s.name == key);

    if (foundseries) {
      foundseries.update({
        name: key ?? lineChart.value[key].name,
        color: lineChart.value[key].color,
        visible: lineChart.value[key].visible,
        data: lineChart.value[key].data,
      });

      continue;
    }

    const s = addSeriesToChart(lineref.value.chart, {
      name: key,
      visible: lineChart.value[key].visible,
      color: lineChart.value[key].color,
      type: "spline",
    });

    s.setData(lineChart.value[key].data);
  }
};

const handleColumnChartChange = () => {
  columnref.value.chart.xAxis[0].setCategories(columnChart.value.categories);

  for (let s of columnChart.value.series) {
    const foundseries = columnref.value.chart.series.find(
      (ss) => ss.name == s.name
    );

    if (foundseries) {
      foundseries.update({
        name: s.name,
        color: s.color,
        visible: s.visible,
      });

      continue;
    }

    const chartSeries = addSeriesToChart(columnref.value.chart, {
      name: s.name,
      visible: s.visible,
      color: s.color,
    });

    chartSeries.setData(s.data);
  }
};

onMounted(() => {
  watch(
    lineChart,
    () => {
      if (props.chart.type === "line") {
        handleLineChartChange();
      }
    },
    { immediate: true }
  );

  watch(
    columnChart,
    () => {
      if (props.chart.type === "column") {
        handleColumnChartChange();
      }
    },
    { immediate: true }
  );
});

const onSettingsIconHover = ({ srcElement }) => {
  const icon = srcElement.children[0];
  if (icon) {
    icon.classList.toggle("visible");
  }
};
</script>

<style>
.highcharts-container,
.highcharts-container svg {
  width: 100% !important;
}
</style>

<style lang="scss" scoped>
.chart-wrapper-card {
  position: relative;

  .settings {
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;

    .settings-icon {
      cursor: pointer;
      visibility: hidden;

      &.visible {
        visibility: visible;
      }
    }
  }

  .data-chart {
    height: 320px;
  }
}
</style>
