<template>
  <div class="options">
    Stop Type:
    <input
      type="checkbox"
      id="travel-stop"
      @click="$emit('refresh-maps')"
    />
    <label for="Type-1">Travel Stop</label>
    <input
      type="checkbox"
      id="country-store"
      @click="$emit('refresh-maps')"
    />
    <label for="Type-2">Country Store</label>
  </div>
</template>

<script>
export default {
  name: "StopTypes",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
