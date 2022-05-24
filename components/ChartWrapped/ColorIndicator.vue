<template>
  <div class="indicator-container" v-bind="{ style }" />
</template>

<script setup>
import { defineProps, computed } from "@nuxtjs/composition-api";

const props = defineProps({
  color: String,
});

const color = computed(() => props.color);

const style = computed(() => `background: ${color.value}`);
</script>

<style scoped>
.indicator-container {
  width: 30px;
  height: 30px;

  border-radius: 1000px;

  background-color: grey;
}
</style>