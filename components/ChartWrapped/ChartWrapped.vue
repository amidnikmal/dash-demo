<template>
  <div>
    <!-- <Controls /> -->

    <v-card class="chart-wrapper-card" :loading="loading">
      <div
        class="settings"
        @mouseover="onSettingsIconHover"
        @mouseleave="onSettingsIconHover"
      >
        <div class="settings-icon">
          <v-btn class="mx-2" fab dark color="indigo">
            <v-icon dark>mdi-cog-outline</v-icon>
          </v-btn>
        </div>
      </div>

      <VueHighcharts class="data-chart" ref="chart" :options="config" />
    </v-card>
  </div>
</template>


<script setup>
// Switching to bar chart ?
import Controls from "./Controls.vue";

import { ref, onMounted } from "@nuxtjs/composition-api";

import { getConfig } from "./config.js";
import { initData, addSeriesToChart } from "./chart.js";

const loading = ref(false);

const chart = ref(null);
const config = getConfig();

onMounted(() => {
  const chartref = chart.value.chart;

  const s = addSeriesToChart(chartref);

  const data = initData(config);

  s.setData(data);
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
        // background: white;
      }
    }
  }

  .data-chart {
    height: 320px;
  }
}
</style>
