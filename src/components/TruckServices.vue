/* eslint-disable prettier/prettier */
<template>
  <div class="options">
    Truck Services:
    <input type="checkbox" id="service--1" value="service-1" />
    <label for="service-1">Oil Change</label>
    <input type="checkbox" id="service-2" value="service-2" />
    <label for="service-2">Break truck 2</label>
    <input type="checkbox" id="service-3" value="service-3" />
    <label for="service-3">Break The Trilogy</label>
    <input type="checkbox" id="service-4" value="service-4" />
    <label for="service-4">Idk what to type</label>
  </div>
</template>

<script>
export default {
  name: "Services",
  data: function() {
    return {
      checkedServices: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
