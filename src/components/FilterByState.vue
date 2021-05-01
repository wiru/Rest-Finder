<template>
  <div class="options">
    <form>
      <!-- State select dropdown -->
      <select name="location" id="state-select" @change="optionsChange(1)">
        <option value="">select state</option>
        <option
          value="location"
          v-for="location in this.$store.state.stateFinder"
          :key="location"
          >{{ location }}
        </option>
      </select>
      <!-- City select dropdown -->
      <select name="city" id="city-select" @change="optionsChange()">
        <option>select city</option>
        <option
          value="city"
          v-for="city in this.$store.state.cityFinder"
          :key="city"
          >{{ city }}
        </option>
      </select>
      <!-- Highway select dropdown -->
      <select name="highway" id="highway-select" @change="optionsChange()">
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
    console.log("THE SECOND MOUNTING")
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
    optionsChange(num) {
      let result = "("; //(state: "NY")
      // State
      const e = document.getElementById("state-select");
      const stateSelect =
        e.selectedIndex !== 0 ? e.options[e.selectedIndex].text : undefined;
      e.selectedIndex !== 0 ? (result += `state: "${stateSelect}"`) : 0;
      e.selectedIndex !== 0
        ? this.$store.commit("setGoogleStateView", e.selectedIndex - 1)
        : this.$store.commit("resetGoogleView");

      // City
      const cityElement = document.getElementById("city-select");
      num === 1 ? (cityElement.selectedIndex = 0) : 0;
      //console.log(f.options[f.selectedIndex].text);
      const citySelect =
        cityElement.selectedIndex !== 0
          ? cityElement.options[cityElement.selectedIndex].text
          : undefined;
      stateSelect && citySelect ? (result += ", ") : 0;
      citySelect ? (result += `city: "${citySelect}"`) : 0;
      cityElement.selectedIndex !== 0
        ? this.$store.commit(
            "setGoogleCityView",
            cityElement.options[cityElement.selectedIndex].text
          )
        : 0;
      // Highway
      const highwayElement = document.getElementById("highway-select");
      const highwaySelect =
        highwayElement.selectedIndex !== 0
          ? highwayElement.options[highwayElement.selectedIndex].text
          : undefined;
      (citySelect && highwaySelect) || (citySelect && highwaySelect)
        ? (result += ", ")
        : 0;
      // Truck services 
      // MAKE STRING

      console.log(highwaySelect);
      console.log(citySelect);
      highwaySelect ? (result += `highway: "${highwaySelect}"`) : 0;
      result += ")";
      result === "()" ? (result = "") : 0;
      console.log(result);
      //   console.log("THIS IS THE RESULT", result);
      //   console.log("DROPDOWN DATA", stateSelect);
      this.$store.commit("setSelectedState", stateSelect);
      this.$store.commit("setSelectedOptions", result);
      this.$store.dispatch("loadMarkers");
      this.$store.dispatch("loadCities");
      this.$store.dispatch("loadHighways");

      // call loadMarkers or not.
    },
    resetView() {
      console.log("SUP!");
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
