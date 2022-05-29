<template>
  <v-container>
    <DashboardControls />
    <v-row>
      <v-col>
        <v-data-table v-bind="dataTable"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, useStore, computed } from "@nuxtjs/composition-api";

const store = useStore();

const initData = async () => {
  await store.dispatch("fakedata/genFakeData");
  await store.dispatch("sensorTypes/getList");
  await store.dispatch("sensors/getList");
  await store.dispatch("data/getList");
};

initData();

const data = computed(() => store.getters["data/list"]);
const sensorTypes = computed(() => store.getters["sensorTypes/list"]);
const sensors = computed(() => store.getters["sensors/list"]);

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