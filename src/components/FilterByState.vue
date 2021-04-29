<template>
  <div>
      Locations:
      <select v-model="state" id="state-input" placeholder="Select a State"/>
        <option v-for="state of res.data.locations.state" v-bind:key="state"> 
        </option>
      <select v-model="city" id="city-input" placeholder="Select a City" />
        <option v-for="city of res.data.locations.city" v-bind:key="city">
        </option>
      <select v-model="highway" id="highway-input" placeholder="Select a Highway" />
        <option v-for="highway of res.data.locations.highway" v-bind:key="highway">
        </option>

  </div>
</template>

<script>
//Need to bring location data from the store here to be used for the dynamic dropdown
//I made a mock up of what it should "sort of" look like based off research
//v-model is used for two way binding. V-for renders element multiple times based on amount of options
//current state is not dynamic
export default {
  name: "FilterByState",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
