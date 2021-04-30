<template>
  <div>
      Restaurants:
      <input type="checkbox" id="restaurant-name-1" value="restaurant-name-1" v-model="checkedRestaurants">
      <label for="restaurant-name-1">Butt!</label>
      <input type="checkbox" id="restaurant-name-2" value="restaurant-name-2" v-model="checkedRestaurants">
      <label for="restaurant-name-2">Behind!!</label>
      <input type="checkbox" id="restaurant-name-3" value="restaurant-name-3" v-model="checkedRestaurants">
      <label for="restaurant-name-3">BOOTY!!!</label>
      <span> Checked Restaurants: {{checkedRestaurants}}</span>
  </div>
</template>

<script>
export default {
  name: "Restaurants",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>