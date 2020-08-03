<template>
  <div id="app">
    <Navigation />
    <router-view class="container" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Root",
  components: {
    Navigation,
  },
};
</script>

<style lang="scss">
$primary: orange;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
