<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"> </slot>
    </template>

    <v-card>
      <v-card-title> Chart settings </v-card-title>

      <v-card-text>
        <v-tabs v-model="tab">
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ item.name }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="FILTERS_TAB">
            <component
              v-bind="props"
              class="mt-3"
              v-if="tabs[FILTERS_TAB] && tabs[FILTERS_TAB].c"
              :is="tabs[FILTERS_TAB].c"
            />
          </v-tab-item>
          <v-tab-item :key="COLORS_TAB">
            <component
              v-bind="props"
              class="mt-3"
              v-if="tabs[COLORS_TAB] && tabs[COLORS_TAB].c"
              :is="tabs[COLORS_TAB].c"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="onRemoveClick">Remove</v-btn>
        <!-- <v-btn text @click="onClickCancel">Cancel</v-btn> -->
        <v-btn color="primary" text @click="onClickUpdate">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import FiltersTab from "./FiltersTab.vue";
import ColorSettingsTab from "./ColorSettingsTab.vue";

import {
  ref,
  watch,
  getCurrentInstance,
  useStore,
  defineProps,
} from "@nuxtjs/composition-api";

const props = defineProps({
  chart: Object,
  index: Number,
});

// const instance = getCurrentInstance();
const store = useStore();

const FILTERS_TAB = 0;
const COLORS_TAB = 1;

const dialog = ref(false);
const tab = ref(null);

const tabs = {
  [FILTERS_TAB]: { name: "Chart settings", c: FiltersTab },
  [COLORS_TAB]: { name: "Colors", c: ColorSettingsTab },
};

// const onClickCancel = () => {
//   dialog.value = false;
// };

const onClickUpdate = () => {
  dialog.value = false;
};

const onRemoveClick = () => {
  const chartIndex = props.index;
  store.dispatch("data/removeChart", chartIndex);
};
</script>
