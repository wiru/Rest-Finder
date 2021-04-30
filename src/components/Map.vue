<template>
  <GmapMap
    :zoom="4"
    :min-zoom="3"
    :max-zoom="5"
    :center="{ lat: 38.7392, lng: -97.9903 }"
    map-type-id="terrain"
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
