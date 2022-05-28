<template>
  <!-- <div>
    <div>fake data list</div>
    <v-btn @click="onClickGenerateNewData">Generate new Data</v-btn>
    <div>{{ successString }}</div>
  </div> -->

  <!-- v-model="valid" -->
  <v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="sensorsCount"
              label="Sensors Count"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="dataCount"
              label="Data frames count"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-menu
              ref="menuref"
              v-model="datarangeMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              @input="onMenuInput"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datesRangeString"
                  label="Fake data dates range"
                  outlined
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="datesRangeString" range />
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="onClickGenerateNewData">Generate fresh data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            {{ successString }}
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <FakeDataTables />
  </v-container>
</template>

<script setup>
import FakeDataTables from "@/components/FakeDataTables";
import { useStore, ref, computed, watch } from "@nuxtjs/composition-api";
import dayjs from "dayjs";

const successString = ref(null);

const datarangeMenu = ref(false);
const datesRangeString = ref(null);

const store = useStore();

const sensorsCount = computed(
  () => store.getters["fakedata/params"].sensorsCount
);
const dataCount = computed(() => store.getters["fakedata/params"].dataCount);
const datesRange = computed(() => store.getters["fakedata/params"].datesRange);

watch(
  datesRange,
  () => {
    if (datesRange.value && datesRange.value.from && datesRange.value.to) {
      datesRangeString.value = [
        dayjs(datesRange.value.from).format("YYYY-MM-DD"),
        dayjs(datesRange.value.to).format("YYYY-MM-DD"),
      ];
    }
  },
  { immediate: true }
);

store.dispatch("fakedata/genFakeData");

const onClickGenerateNewData = () => {
  store.dispatch("fakedata/genFakeData", { reset: true });
  successString.value = "New data has been generated";
};

const onMenuInput = () => {
  if (datesRangeString.value) {
    const from = dayjs(datesRangeString.value[0]);
    const to = dayjs(datesRangeString.value[1]);

    store.dispatch("fakedata/setParams", {
      key: "datesRange",
      value: { from, to },
    });
  }
};
</script>