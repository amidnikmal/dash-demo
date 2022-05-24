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
              class="mt-3"
              v-if="tabs[FILTERS_TAB] && tabs[FILTERS_TAB].c"
              :is="tabs[FILTERS_TAB].c"
            />
          </v-tab-item>

          <v-tab-item :key="COLORS_TAB"> Colors </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClickCancel">Cancel</v-btn>
        <v-btn color="primary" text @click="onClickUpdate">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import FiltersTab from "./FiltersTab.vue";
import { ref, watch } from "@nuxtjs/composition-api";

const FILTERS_TAB = 0;
const COLORS_TAB = 1;

// const DATES_RANGE_TAB = 2;

const dialog = ref(false);
const tab = ref(null);

// const tabs = ["Sensor types", "Sensors", "Dates range"];

const tabs = {
  [FILTERS_TAB]: { name: "Filters", c: FiltersTab },
  [COLORS_TAB]: { name: "Colors" },
};

const text = "hello world";
// watch(tab, () => {
//   console.log("TAB", tab);
// });

const onClickCancel = () => {
  console.log("onClickCancel");
};

const onClickUpdate = () => {
  console.log("onClickUpdate");
};
</script>
