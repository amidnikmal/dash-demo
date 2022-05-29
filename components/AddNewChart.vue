   
<template>
  <v-card class="my-3 ml-3">
    <div class="d-flex align-center justify-center pa-3">
      Add new chart

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            color="indigo"
            @click="dialog = true"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> Warning </v-card-title>

          <v-card-text>
            Before add new chart you need to reset current filters set
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="onAddNewChart"> Proceed </v-btn>
            <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script setup>
import { useStore, ref } from "@nuxtjs/composition-api";
const store = useStore();

const dialog = ref(false);

const onAddNewChart = async () => {
  store.commit("data/setFilters", {
    sensorsFilter: [],
    sensorTypesFilter: [],
    dateRangeFilter: [],
  });

  await store.dispatch("fakedata/genFakeData");
  await store.dispatch("sensorTypes/getList");
  await store.dispatch("sensors/getList");
  await store.dispatch("data/getList");

  store.dispatch("data/addChart");
};
</script>
