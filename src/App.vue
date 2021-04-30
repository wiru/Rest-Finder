<template>
  <div id="app">
    <h1>BIG MOTHER TRUCKERS!!!!!!!</h1>
    <div>
      <Map />
    </div>
    <div>
      <FilterByState />
    </div>
    <div>
      <TruckServices />
    </div>
    <div>
      <StopType />
    </div>
    <div>
      <Amenities />
    </div>
    <div>
      <Restaurants />
    </div>
  </div>
</template>

<script>
import FilterByState from "./components/FilterByState.vue";
import Amenities from "./components/Amenities.vue";
import Restaurants from "./components/Restaurants.vue"
import TruckServices from "./components/TruckServices.vue";
import StopType from "./components/StopType.vue";
import Map from "./components/Map";

export default {
  name: "app",
  components: {
    FilterByState,
    Map,
    Restaurants,
    TruckServices,
    Amenities,
    StopType
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
