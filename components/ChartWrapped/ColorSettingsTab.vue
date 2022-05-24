<template>
  <v-container>
    <v-row :key="key" v-for="(item, key) in props.chart.agg">
      <v-col>
        <v-checkbox
          @change="onCheckboxChanged(key, $event)"
          :label="`${getLineName(item, key)}`"
          :input-value="item.visible"
        />
      </v-col>

      <v-col class="d-flex align-center">
        <v-menu
          ref="menuref"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
          @input="onMenuInput(key, $event)"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">Set color</v-btn>
          </template>

          <v-color-picker
            v-model="colorPickerValue"
            dot-size="25"
            swatches-max-height="200"
          />
        </v-menu>
      </v-col>

      <v-col class="d-flex align-center">
        <ColorIndicator :color="item.color" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ColorIndicator from "./ColorIndicator.vue";

import { defineProps, ref, useStore } from "@nuxtjs/composition-api";

const props = defineProps({
  chart: Object,
  index: Number,
});

const colorPickerValue = ref(null);

const store = useStore();

const onCheckboxChanged = (key, ev) => {
  const index = props.index;
  store.dispatch("data/changeChartParams", { index, key, visible: ev });
};

const onMenuInput = (key, ev) => {
  if (!ev) {
    const index = props.index;
    const color = colorPickerValue.value.hex;
    store.dispatch("data/changeChartParams", { index, key, color });
  }
};

const getLineName = (item, key) => `${item.sensor.mac}(${key.split("_")[1]})`;
</script>

