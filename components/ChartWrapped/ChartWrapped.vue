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

    <VueHighcharts class="data-chart" ref="chartref" :options="config" />
  </v-card>
</template>


<script setup>
import Settings from "./Settings.vue";

import { ref, onMounted, watch, defineProps } from "@nuxtjs/composition-api";

import { getConfig } from "./config.js";
import { addSeriesToChart } from "./chart.js";
import dayjs from "dayjs";

const props = defineProps({
  chart: Object,
  index: Number,
});

const loading = ref(false);
const chartref = ref(null);

const tooltipFormatter = function () {
  const humanReadableSensorNames = {
    humi: "Humidity",
    temp: "Temperature",
    light: "Light",
  };

  const line = props.chart.agg[this.series.name];

  const { mac } = line.sensor;

  const sensorKind = humanReadableSensorNames[this.series.name.split("_")[1]];
  const timestamp = dayjs().format("DD MMM YYYY HH:mm:ss");

  return `<div>${sensorKind}(${mac}) : <b>${this.y}</b></div> <br/> <div>Timestamp: ${timestamp}</div>`;
};

const config = { ...getConfig(), tooltip: { formatter: tooltipFormatter } };

onMounted(() => {
  watch(
    props.chart.agg,
    () => {
      for (const key in props.chart.agg) {
        const foundseries = chartref.value.chart.series.find(
          (s) => s.name == key
        );

        if (foundseries) {
          foundseries.update({
            name: key ?? props.chart.agg[key].name,
            color: props.chart.agg[key].color,
            visible: props.chart.agg[key].visible,
          });

          continue;
        }

        const s = addSeriesToChart(chartref.value.chart, {
          name: key,
          visible: props.chart.agg[key].visible,
          color: props.chart.agg[key].color,
        });

        s.setData(props.chart.agg[key].data);
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
