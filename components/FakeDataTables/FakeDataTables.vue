<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab v-for="(item, index) in tabs" :key="index">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="SENSOR_TYPES_TAB">
        <v-data-table v-bind="sensorTypesTable"></v-data-table>
      </v-tab-item>
      <v-tab-item :key="SENSORS_TAB">
        <v-data-table v-bind="sensorsTable"></v-data-table>
      </v-tab-item>
      <v-tab-item :key="DATA_FRAMES">
        <v-data-table v-bind="dataTable"></v-data-table
      ></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, useStore, computed } from "@nuxtjs/composition-api";

const SENSOR_TYPES_TAB = 0;
const SENSORS_TAB = 1;
const DATA_FRAMES = 2;

const tab = ref(null);

const tabs = {
  [SENSOR_TYPES_TAB]: { name: "Sensor types" },
  [SENSORS_TAB]: { name: "Sensors" },
  [DATA_FRAMES]: { name: "Data frames" },
};

const store = useStore();

const sensorTypes = computed(() => store.getters["fakedata/sensorTypes"]);
const sensors = computed(() => store.getters["fakedata/sensors"]);
const data = computed(() => store.getters["fakedata/data"]);

const sensorTypesTable = computed(() => ({
  headers: [
    { text: "ID", value: "id" },
    { text: "Sensor type name", value: "name" },
    { text: "Sensor parameters", value: "sensors" },
  ],
  items: sensorTypes.value,
}));

const sensorsTable = computed(() => ({
  headers: [
    { text: "ID", value: "id" },
    { text: "Sensor MAC", value: "mac" },
    { text: "Sensor type", value: "sensorType" },
    { text: "Created At", value: "formattedTimestamp" },
  ],
  items: sensors.value.map((s) => {
    const foundSensorType = sensorTypes.value.find((st) => st.id == s.type);

    const sensorType = foundSensorType.name;

    const formattedTimestamp = dayjs(s.timestamp).format("YYYY-MM-DD HH:mm");

    return {
      ...s,
      sensorType,
      formattedTimestamp,
    };
  }),
}));

const dataTable = computed(() => ({
  headers: [
    { text: "ID", value: "id" },
    { text: "Sensor MAC", value: "mac" },
    { text: "Sensor Type", value: "sensorType" },
    { text: "Created At", value: "formattedTimestamp" },
    { text: "Payload", value: "payload" },
  ],
  items: data.value.map((dataItem) => {
    const foundSensorType = sensorTypes.value.find(
      (st) => st.id == dataItem.sensor_type
    );

    const { mac } = sensors.value.find((s) => s.id == dataItem.sensor_id);

    const formattedTimestamp = dayjs(dataItem.timestamp).format(
      "YYYY-MM-DD HH:mm"
    );

    return {
      ...dataItem,
      mac,
      formattedTimestamp,
      payload: JSON.stringify(dataItem.payload),
      sensorType: foundSensorType.name,
    };
  }),
}));
</script>