<template>
  <GmapMap
    :zoom="this.$store.state.selectedZoom"
    :center="{
      lat: this.$store.state.selectedLatitude,
      lng: this.$store.state.selectedLongitude,
    }"
    map-type-id="terrain"
    :options="{ minZoom: 4, maxZoom: 10 }"
  >
    <GmapMarker
      v-for="location in locations"
      :key="location.key"
      :icon="{ url: `${location.icon}` }"
      :position="location.position"
      :animation="location.defaultAnimation"
      @click="$emit('marker-selected', location.key)"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  mounted() {
    this.getLocations();
    this.getAllCoords();
    // console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
    getAllCoords() {
      this.$store.dispatch("loadStateCoords");
      this.$store.dispatch("loadCityCoords");
    },
    markerRightClicked() {},
  },
};
</script>

<style scoped>
.vue-map-container {
  height: 500px;
  border-radius: 10px;
  border: solid rgb(255, 217, 0) 5px;
  overflow: hidden;
}
@media all and (max-width: 1080px) {
  .vue-map-container {
    height: 400px;
    width: 80vw;
    align-self: center;
  }
}
</style>
