<template>
  <v-container fluid class="dashboard-container">
    <DashboardControls />

    <div class="dashboard-container-content">
      <v-card class="stats my-3">
        <SensorsStat />
        <DonutChart />
      </v-card>

      <div class="dynamic-charts">
        <ChartWrapped
          class="my-3 ml-3"
          :key="index"
          v-for="(chart, index) in charts"
          v-bind="{ index, chart }"
        />

        <AddNewChart />
      </div>
    </div>
  </v-container>
</template>

<script>
// import { watch } from "@nuxtjs/composition-api";

import SensorsStat from "@/components/SensorsStat";

import DonutChart from "@/components/DonutChart";
import ChartWrapped from "@/components/ChartWrapped";
import DashboardControls from "@/components/DashboardControls";
import AddNewChart from "@/components/AddNewChart";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ChartWrapped,
    DashboardControls,
    AddNewChart,
    DonutChart,
    SensorsStat,
  },

  async mounted() {
    await this.getSensorTypesList();
    await this.getSensorsList();
    await this.getDataList();

    console.log(this.sensors);
    console.log(this.sensorTypes);
    console.log(this.data);

    // const handler = () => {
    //   const { sm, md, lg } = this.$vuetify.breakpoint;
    // };
    // // Throttle !
    // watch(this.$vuetify.breakpoint, handler, { immediate: true });
  },

  computed: {
    ...mapGetters({
      sensors: "sensors/list",
      sensorTypes: "sensorTypes/list",
      data: "data/list",
      charts: "data/charts",
    }),
  },

  methods: {
    ...mapActions({
      getSensorTypesList: "sensorTypes/getList",
      getSensorsList: "sensors/getList",
      getDataList: "data/getList",
    }),
  },
};
</script>


<style scoped lang="scss">
.dashboard-container-content {
  display: flex;
  // padding: 24px;

  .stats {
    flex: 1;
  }

  .dynamic-charts {
    flex-basis: 60%;
  }
}

// .data-chart {
//   flex-basis: 60%;
// }

// .chart {
//   flex: 1;
// }
</style>
