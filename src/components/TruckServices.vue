/* eslint-disable prettier/prettier */
<template>
  <div class="options">
    Truck Services:
    <input type="checkbox" id="oil-change" @click="$emit('refresh-maps')" />
    <label for="service-1">Oil Change</label>
    <input type="checkbox" id="light-mechanical" @click="$emit('refresh-maps')" />
    <label for="service-2">Light Mechanical</label>
    <input type="checkbox" id="tire-care" @click="$emit('refresh-maps')" />
    <label for="service-3">Tire Care</label>
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
