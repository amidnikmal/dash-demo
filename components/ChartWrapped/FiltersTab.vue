<template>
  <v-container>
    <v-menu
      ref="menuref"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Dates range filter"
          outlined
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker v-model="date" range />
    </v-menu>

    <v-container fluid>
      <v-radio-group column v-model="radios">
        <template v-slot:label>
          <div>Chart type</div>
        </template>
        <v-radio label="Column chart" value="column"></v-radio>
        <v-radio label="Line chart" value="line"></v-radio>
      </v-radio-group>
    </v-container>

    <!-- <v-autocomplete
      :items="preparedSensorTypesList"
      solo
      outlined
      multiple
      label="Sensors types"
    />

    <v-autocomplete
      :items="preparedSensorsList"
      solo
      outlined
      multiple
      label="Sensors filter"
    /> -->
  </v-container>
</template>

<script setup>
import { ref, watch, useStore } from "@nuxtjs/composition-api";

const props = defineProps({
  chart: Object,
  index: Number,
});

const store = useStore();

const menu = ref(false);
const date = ref(null);

const radios = ref(props.chart.type);

watch(radios, () => {
  store.dispatch("data/setChartType", {
    index: props.index,
    type: radios.value,
  });
});
</script>