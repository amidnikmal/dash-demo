<template>
  <v-card class="controls-wrapper-card flex-grow-1 my-3">
    <v-row class="ma-0">
      <!-- class="ma-0 pa-0" -->
      <v-col ld="2" md="3" xs="12">
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
      </v-col>

      <!-- class="ma-0 pa-0" -->
      <v-col ld="2" md="3" xs="12">
        <v-autocomplete solo outlined multiple label="Sensors filter" />
      </v-col>

      <!-- class="ma-0 pa-0" -->
      <v-col ld="2" md="3" xs="12">
        <v-autocomplete solo outlined multiple label="Sensors types" />
      </v-col>

      <v-col ld="2" md="3" xs="12" class="d-flex">
        <v-btn class="flex-grow-1" depressed color="primary"> Refresh </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "@nuxtjs/composition-api";

const menu = ref(false);
const date = ref(null);

// const activePicker = ref(null);
// const menuref = ref(null);
</script>


<style scoped>
.controls-wrapper-card {
  /* margin: 24px; */
  /* margin-bottom: 0; */
}
</style>