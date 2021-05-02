<template>
  <div class="options">
    <form>
      <!-- State select dropdown -->
      <select name="location" id="state-select" @change="$emit('refresh-maps', 1)">
        <option value="">select state</option>
        <option
          value="location"
          v-for="location in this.$store.state.stateFinder"
          :key="location"
          >{{ location }}
        </option>
      </select>
      <!-- City select dropdown -->
      <select name="city" id="city-select" @change="$emit('refresh-maps')">
        <option>select city</option>
        <option
          value="city"
          v-for="city in this.$store.state.cityFinder"
          :key="city"
          >{{ city }}
        </option>
      </select>
      <!-- Highway select dropdown -->
      <select name="highway" id="highway-select" @change="$emit('refresh-maps')">
        <option>select highway</option>
        <option
          value="highway"
          v-for="highway in this.$store.state.highwayFinder"
          :key="highway"
          >{{ highway }}
        </option>
      </select>
      <!-- <button type="button" id="reset-btn" /> -->
    </form>
  </div>
</template>

<script>
//Need to bring location data from the store here to be used for the dynamic dropdown
//I made a mock up of what it should "sort of" look like based off research
//v-model is used for two way binding. V-for renders element multiple times based on amount of options
//current state is not dynamic
export default {
  mounted() {
    this.getStates();
    this.getHighways();
  },
  data: function() {
    return {
      stateFinder: this.$store.state.stateFinder,
      cityFinder: this.$store.state.cityFinder,
    };
  },
  name: "FilterByState",
  props: ["location"],
  methods: {
    getStates() {
      this.$store.dispatch("loadStates");
    },
    getHighways() {
      this.$store.dispatch("loadHighways");
    },
    resetView() {
      this.$store.commit("resetGoogleView");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#state-select {
  width: 100px;
}
#city-select {
  width: 100px;
}
#reset-btn {
  width: 75px;
  height: 20px;
}
</style>
