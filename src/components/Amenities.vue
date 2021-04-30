<template>
  <div class="options">
    Amenities:
    <input
      type="checkbox"
      id="amenity-1"
      value="amenity-1"
      v-model="checkedAmenities"
    />
    <label for="amenity-1">Hire Hitman</label>
    <input
      type="checkbox"
      id="amenity-2"
      value="amenity-2"
      v-model="checkedAmenities"
    />
    <label for="amenity-2">Hire Coder</label>
    <span> Checked Amenities: {{ checkedAmenities }}</span>
  </div>
</template>

<script>
export default {
  name: "Amenities",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
