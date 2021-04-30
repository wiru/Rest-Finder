<template>
  <div class="options" id="top-option">
    Locations:
    <!-- <select v-model="state" id="state-input" />
    <option v-for="state of locations.state" v-bind:key="state"> </option> -->
    <input type="text" id="city-input" placeholder="Enter City" />
    <input type="text" id="highway-input" placeholder="Enter Highway" />
  </div>
</template>

<script>
export default {
  name: "FilterByState",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#top-option {
  margin-top: 120px;
}
@media all and (max-width: 1080px) {
  #top-option {
    margin-top: 20px;
  }
}
</style>
