   
<template>
  <v-card class="my-3 ml-3">
    <div class="d-flex align-center justify-center pa-3">
      Add new chart

      <v-btn class="mx-2" fab dark color="indigo" @click="onAddNewChart">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { useStore } from "@nuxtjs/composition-api";
const store = useStore();

const onAddNewChart = () => {
  store.dispatch("data/addChart", { props: "hello " });
};
</script>
