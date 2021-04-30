<template>
  <div class="options">
    type:
    <input type="checkbox" id="Type-1" value="Type-1" v-model="checkedTypes" />
    <label for="Type-1">Trash</label>
    <input type="checkbox" id="Type-2" value="Type-2" v-model="checkedTypes" />
    <label for="Type-2"
      >Less Trash, but kind of trash still, but it will do</label
    >
    <span> Checked Types: {{ checkedTypes }}</span>
  </div>
</template>

<script>
export default {
  name: "StopTypes",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
