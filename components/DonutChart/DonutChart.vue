<template>
  <VueHighcharts v-if="config" ref="chartref" :options="config" />
</template>


<script setup>
import {
  useStore,
  watch,
  ref,
  computed,
  onMounted,
} from "@nuxtjs/composition-api";
import { pieConfigDefault } from "./config";

const store = useStore();

const sensorsList = computed(() => store.getters["sensors/list"]);

const sensorsTypes = computed(() => store.getters["sensorTypes/list"]);

let agg = {};

let tempconfig = JSON.parse(JSON.stringify(pieConfigDefault));

let config = ref(null);

const chartref = ref(null);

watch(
  sensorsList,
  () => {
    agg = {};

    tempconfig.series = [
      {
        name: "Amount of sensor of particular type",
        colorByPoint: true,
        innerSize: "75%",
        data: [],
      },
    ];

    if (sensorsList.value.length > 0) {
      for (let sensor of sensorsList.value) {
        if (!agg[sensor.type]) {
          agg[sensor.type] = [];
        }

        agg[sensor.type].push(sensor);
      }

      for (const key in agg) {
        const foundSensorType = sensorsTypes.value.find(
          (st) => st.id === Number(key)
        );

        if (!foundSensorType) {
          continue;
        }

        tempconfig.series[0].data.push({
          name: foundSensorType.name,
          y: agg[key].length,
        });
      }

      config.value = tempconfig;

      if (chartref.value) {
        chartref.value.chart.series[0].update({
          data: config.value.series[0].data,
        });
      }
    }
  },
  { immediate: true }
);
</script>