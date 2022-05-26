<template>
  <v-container>
    <v-row>
      <v-col class="text-h4 d-flex justify-center">Total sensors:</v-col>
    </v-row>

    <v-row>
      <v-col class="text-h5 d-flex justify-center">
        {{ sensorsList.length }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useStore, computed } from "@nuxtjs/composition-api";

const store = useStore();

const sensorsList = computed(() => store.getters["sensors/list"]);
</script>