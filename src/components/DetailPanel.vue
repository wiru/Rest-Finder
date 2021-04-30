<template>
  <div class="options">
    <h3>Detailed information regarding this stop</h3>
    <div class="detailedGrid">
      <p>Name</p>
      <p>{{ selectedSite }}</p>
      <p>Address</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails.address1 : "" }}</p>
      <p>Type</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails.subtype : "" }}</p>
      <p>Zipcode</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails["zip_code"] : "" }}</p>
      <p>Exit</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails.exit : "" }}</p>
      <p>Phone</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails.phone : "" }}</p>
      <p>Fax</p>
      <p>{{ selectedSiteDetails ? selectedSiteDetails.fax : "" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPanel",
  props: ["selectedSite", "selectedSiteDetails"],
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
