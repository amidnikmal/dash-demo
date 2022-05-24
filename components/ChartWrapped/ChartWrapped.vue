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
          <Settings>
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

      <VueHighcharts class="data-chart" ref="chart" :options="config" />
    </v-card>
  </div>
</template>


<script setup>
// Switching to bar chart ?
import Controls from "./Controls.vue";
import Settings from "./Settings.vue";

import {
  ref,
  computed,
  onMounted,
  useStore,
  watch,
  nextTick,
} from "@nuxtjs/composition-api";

import { getConfig } from "./config.js";
import { initData, addSeriesToChart } from "./chart.js";

const store = useStore();

// const sensors = computed(() => store.getters["sensors/list"]);
// const sensorTypes = computed(() => store.getters["sensorTypes/list"]);

const dataAgg = computed(() => store.getters["data/agg"]);
const visibleSensors = computed(() => store.getters["data/visibleSensors"]);

const loading = ref(false);

const chart = ref(null);
const config = getConfig();

onMounted(() => {
  const chartref = chart.value.chart;

  watch(
    visibleSensors,
    () => {
      for (const key in visibleSensors.value) {
        const s = addSeriesToChart(chartref, { name: key });
        s.setData(visibleSensors.value[key].data);
      }
    },
    { immediate: true }
  );

  // const data = initData(config);
  // s.setData(data);
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
