<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="false" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <Nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Data",
          to: "/data",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Fake data settings",
          to: "/fakedata",
        },
      ],
      miniVariant: false,
      title: "Sensors Dashboard Demo",
    };
  },
};
</script>
