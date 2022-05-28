<template>
  <v-container>
    <v-container fluid>
      <v-radio-group column v-model="radios">
        <template v-slot:label>
          <div>Chart type</div>
        </template>
        <v-radio label="Column chart" value="column"></v-radio>
        <v-radio label="Line chart" value="line"></v-radio>
      </v-radio-group>
    </v-container>
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