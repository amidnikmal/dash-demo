<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
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
                  :value="dateRangeFilter"
                  label="Dates range filter"
                  outlined
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                :value="dateRangeFilter"
                @input="onFilterChanged('dateRangeFilter', $event)"
                range
              />
            </v-menu>
          </v-col>

          <v-col>
            <v-autocomplete
              :value="sensorTypesFilter"
              @input="onFilterChanged('sensorTypesFilter', $event)"
              :items="preparedSensorTypesList"
              solo
              outlined
              multiple
              label="Sensors types"
            />
          </v-col>

          <v-col>
            <v-autocomplete
              :value="sensorsFilter"
              @input="onFilterChanged('sensorsFilter', $event)"
              :items="preparedSensorsList"
              solo
              outlined
              multiple
              label="Sensors filter"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="primary" @click="onFilter"> Filter </v-btn>
          </v-col>

          <v-col>
            <v-btn color="warning" @click="onResetFilter"> Reset </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, useStore } from "@nuxtjs/composition-api";

const store = useStore();

const sensors = computed(() => store.getters["sensors/list"]);
const sensorTypes = computed(() => store.getters["sensorTypes/list"]);

const preparedSensorsList = computed(() => sensors.value.map((s) => s.mac));
const preparedSensorTypesList = computed(() =>
  sensorTypes.value.map((s) => s.name)
);

const menu = ref(false);

const dateRangeFilter = computed(
  () => store.getters["data/filters"].dateRangeFilter
);

const sensorTypesFilter = computed(
  () => store.getters["data/filters"].sensorTypesFilter
);

const sensorsFilter = computed(
  () => store.getters["data/filters"].sensorsFilter
);

const onFilterChanged = (key, value) => {
  store.commit("data/setFilters", {
    [key]: value,
  });
};

const onFilter = () => {
  store.dispatch("data/getList");
};

const onResetFilter = () => {
  store.commit("data/setFilters", {
    dateRangeFilter: null,
    sensorTypesFilter: null,
    sensorsFilter: null,
  });

  store.dispatch("data/getList");
};
</script>

