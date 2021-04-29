<template>
  <GmapMap
    :zoom="5"
    :center="{ lat: 35.7392, lng: -97.9903 }"
    map-type-id="terrain"
  >
    <GmapMarker
      v-for="location in locations"
      :key="location.key"
      :position="location.position"
      :animation="location.defaultAnimation"
      @rightclick="markerRightClicked"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    markerRightClicked() {},
  },
};
</script>

<style scoped>
.vue-map-container {
  height: 50vh;
  border-radius: 20px;
  border: solid yellow 5px;
  overflow: hidden;
  margin-right: 50px;
}
</style>
