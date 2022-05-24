<template>
  <v-container fluid class="dashboard-container">
    <DashboardControls />

    <div class="dashboard-container-content">
      <v-card class="stats my-3"> stats </v-card>

      <div class="dynamic-charts">
        <!-- <ChartWrapped class="my-3 ml-3" />
        <ChartWrapped class="my-3 ml-3" /> -->

        <ChartWrapped
          class="my-3 ml-3"
          :key="index"
          v-for="(chart, index) in charts"
          v-bind="{ index, chart }"
        />

        <v-card class="my-3 ml-3">
          <div class="d-flex align-center justify-center pa-3">
            Add new chart

            <v-btn class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
// import { watch } from "@nuxtjs/composition-api";
import ChartWrapped from "@/components/ChartWrapped";
import DashboardControls from "@/components/DashboardControls";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { ChartWrapped, DashboardControls },

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
