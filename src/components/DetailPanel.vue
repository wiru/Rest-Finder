<template>
  <div class="options">
    <h3>This is the detailed panel</h3>
    <div class="detailedGrid">
      <p>Name</p>
      <p>{{ SelectedSite }}</p>
      <p>Address</p>
      <p>{{ address1 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPanel",
  props: ["SelectedSite"],
  data: function() {
    return {
      stopName: "",
      address1: "",
      type: "",
      highway: "",
      zipcode: "",
      exit: "",
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.detailedGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

label {
  display:block;
}

</style>
