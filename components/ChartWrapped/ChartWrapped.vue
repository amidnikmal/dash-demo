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

      <VueHighcharts class="data-chart" ref="chartref" :options="config" />
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
  defineProps,
} from "@nuxtjs/composition-api";

import { getConfig } from "./config.js";
import { initData, addSeriesToChart } from "./chart.js";

const props = defineProps({
  chart: Object,
  index: Number,
});

// console.log("PROPS", props);
// const store = useStore();
// const sensors = computed(() => store.getters["sensors/list"]);
// const sensorTypes = computed(() => store.getters["sensorTypes/list"]);
// const dataAgg = computed(() => store.getters["data/agg"]);
// const visibleSensors = computed(() => store.getters["data/visibleSensors"]);

const loading = ref(false);
const chartref = ref(null);
const config = getConfig();

onMounted(() => {
  const localchartref = chartref.value.chart;

  watch(
    props.chart.agg,
    () => {
      for (const key in props.chart.agg) {
        const s = addSeriesToChart(localchartref, { name: key });
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
