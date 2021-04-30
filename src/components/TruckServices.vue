<template>
  <div>
      Truck Services:
      <input type="checkbox" id="service--1" value="service-1" v-model="checkedServices">
      <label for="service-1">Break truck</label>
      <input type="checkbox" id="service-2" value="service-2" v-model="checkedServices">
      <label for="service-2">Break truck 2</label>
      <input type="checkbox" id="service-3" value="service-3" v-model="checkedServices">
      <label for="service-3">Break The Trilogy</label>
      <input type="checkbox" id="service-4" value="service-4" v-model="checkedServices">
      <label for="service-4">Idk what to type</label>
      <span> Checked Services: {{checkedServices}}</span>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>