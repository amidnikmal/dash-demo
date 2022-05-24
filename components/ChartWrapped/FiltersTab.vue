<template>
  <div>
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

    <v-autocomplete
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
    />
  </div>
</template>

<script setup>
import { ref } from "@nuxtjs/composition-api";
const menu = ref(false);
const date = ref(null);
</script>