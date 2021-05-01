<template>
  <div id="app">
    <header>
      <img id="header-logo" src="./assets/croc3.png" alt="A cute alligator" />
      <h1>Pit Stop</h1>
    </header>
    <div id="navbar">
      <img
        id="speech-bubble"
        src="./assets/speech-bubble.png"
        alt="speech bubble"
      />
      <img id="map-gator" src="./assets/croc2.png" alt="cute alligator" />
    </div>
    <div id="flexbox-container">
      <div id="column1">
        <FilterByState @refresh-maps="optionsChange($event)" />
        <!-- v-bind:locations="locations" -->
        <TruckServices @refresh-maps="optionsChange($event)" />
        <StopType @refresh-maps="optionsChange($event)" />
        <!-- <Amenities /> -->
        <!-- <Restaurants /> -->
      </div>
      <div id="column2">
        <Map v-on:marker-selected="fillDetailPane($event)" />
        <DetailPanel
          v-if="markerSelected"
          :selectedSite="selectedSite"
          :selectedSiteDetails="selectedSiteDetails"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import Amenities from "./components/Amenities.vue";
// import Restaurants from "./components/Restaurants.vue";
import TruckServices from "./components/TruckServices.vue";
import StopType from "./components/StopType.vue";
import Map from "./components/Map";
import FilterByState from "./components/FilterByState.vue";
import DetailPanel from "./components/DetailPanel.vue";

export default {
  name: "app",
  data: function() {
    return {
      markerSelected: false,
      selectedSite: "",
      selectedSiteDetails: {},
    };
  },
  components: {
    FilterByState,
    Map,
    // Restaurants,
    TruckServices,
    // Amenities,
    StopType,
    DetailPanel,
  },
  methods: {
    async fillDetailPane(truckStopname) {
      this.markerSelected = true;
      this.selectedSite = truckStopname;
      console.log(`Event triggered: ${truckStopname}`);
      try {
        const locationDetails = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{ 
  singleLocation(locationName: "${truckStopname}") {
        name
        address1
        zip_code
        subtype
        exit
        phone
        fax
    		state
        restaurants
    }
}`,
          }),
        })
          .then((data) => data.json())
          .then(
            (locationArrayObject) => locationArrayObject.data.singleLocation[0]
          );
        this.selectedSiteDetails = locationDetails;
      } catch (error) {
        console.error(error);
      }
    },
    optionsChange(reset) {
      reset ? document.getElementById("city-select").selectedIndex = 0 : 0;
      let result = [];
      let cityState = [];
      let highwayState = [];

      const stateElement = document.getElementById("state-select");
      stateElement.selectedIndex !== 0 ? result.push(`state: "${stateElement.options[stateElement.selectedIndex].text}"`) : 0;
      stateElement.selectedIndex !== 0 ? cityState.push(`state: "${stateElement.options[stateElement.selectedIndex].text}"`) : 0;
      stateElement.selectedIndex !== 0 ? highwayState.push(`state: "${stateElement.options[stateElement.selectedIndex].text}"`) : 0;

      const cityElement = document.getElementById("city-select");
      cityElement.selectedIndex !== 0 ? result.push(`city: "${cityElement.options[cityElement.selectedIndex].text}"`) : 0;
      cityElement.selectedIndex !== 0 ? cityState.push(`city: "${cityElement.options[cityElement.selectedIndex].text}"`) : 0;

      const highwayElement = document.getElementById("highway-select");
      highwayElement.selectedIndex !== 0 ? result.push(`highway: "${highwayElement.options[highwayElement.selectedIndex].text}"`) : 0;
      highwayElement.selectedIndex !== 0 ? highwayState.push(`city: "${highwayElement.options[highwayElement.selectedIndex].text}"`) : 0;

      const countryStoreBool = document.getElementById("country-store").checked;
      const travelStopBool = document.getElementById("travel-stop").checked;

      !countryStoreBool && travelStopBool ? result.push(`subtype: "Travel Stop"`) : 0;  
      !travelStopBool && countryStoreBool ? result.push(`subtype: "Country Store"`) : 0;

      const oilChangeBool = document.getElementById("oil-change").checked;
      oilChangeBool ? result.push(`hasOilChange: true`) : 0;

      const lightMechanicalBool = document.getElementById("light-mechanical").checked;
      lightMechanicalBool ? result.push(`hasLightMechanical: true`) : 0;

      const tireCareBool = document.getElementById("tire-care").checked;
      tireCareBool ? result.push(`hasTireCare: true`) : 0;

      let resultString = `(${result.join(", ")})`;
      resultString === "()" ? resultString = "" : 0;

      let cityStateString = ` (${cityState.join(", ")})`;
      console.log("CSS0", cityStateString)
      cityStateString === "()" ? cityStateString = "" : 0;

      let highwayStateString = `(${highwayState.join(", ")})`;
      console.log("HSS0", highwayStateString)
      highwayStateString === "()" ? highwayStateString = "" : 0;

      let stateSelect = stateElement.selectedIndex !== 0 ? `(state: "${stateElement.options[stateElement.selectedIndex].text}")` : "";
      // let citySelect = cityElement.selectedIndex !== 0 ? `city: "${cityElement.options[cityElement.selectedIndex].text}"` : "";
      console.log("CSS", cityStateString)
      console.log("HSS", highwayStateString)

      this.$store.commit("setSelectedState", stateSelect);
      this.$store.commit("setSelectedHighwayState", highwayStateString);
      this.$store.commit("setSelectedCityState", cityStateString);
      this.$store.commit("setSelectedOptions", resultString);
      this.$store.dispatch("loadMarkers");
      this.$store.dispatch("loadCities");
      this.$store.dispatch("loadHighways");

      // call loadMarkers or not.
    },
  },
};
</script>

<style>
body {
  background-image: url("./assets/background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  min-height: 100vh;
  margin: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-block-start: 0px;
  overflow: auto;
  width: 90%;
  margin: auto;
}
header {
  display: flex;
  margin: auto;
  width: 82%;
  margin-top: 20px;
  justify-content: left;
  color: rgb(255, 217, 0);
  font-size: 2rem;
  margin-bottom: -20px;
}
h1 {
  margin-top: 50px;
  margin-left: 35px;
  font-family: "lobster";
  font-size: 5rem;
  z-index: 2;
}
#header-logo {
  max-width: 250px;
  padding: 10px;
  height: auto;
  object-fit: cover;
  z-index: 2;
}

#flexbox-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin: auto;
  z-index: 0;
}
#column1 {
  display: flex;
  flex-direction: column;
  flex: 1;
}
#column2 {
  display: flex;
  flex-direction: column;
  margin: 10px;
  flex: 2;
  z-index: 1;
}
.options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-image: linear-gradient(
    to top right,
    rgb(0, 153, 25),
    rgb(1, 224, 1)
  );
  color: rgb(255, 217, 0);
  border: solid rgb(255, 217, 0) 3px;
  border-radius: 10px;
  min-width: 200px;
  height: 20%;
  margin: 10px;
  padding: 10px;
  margin-right: 30px;
  text-align: left;
  font-size: 1.2rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#navbar {
  display: flex;
  margin: auto;
  width: min(1200px, 90%);
  z-index: 10;
  justify-content: flex-end;
  margin-bottom: -9px;
}
#map-gator {
  margin-right: 30px;
  margin-bottom: -5px;
  max-width: 150px;
  height: 80px;
  margin-top: auto;
  z-index: 10;
}
#speech-bubble {
  margin-right: -10px;
  max-height: 80px;
  width: 250px;
  height: auto;
  margin-bottom: 30px;
  /* The line below fixes Chrome blurring images when they downscale */
  transform: translateZ(0);
}
#wave {
  margin: 0px;
  width: 100%;
  max-height: 250px;
  position: absolute;
  z-index: 1;
}

@media all and (max-width: 1080px) {
  #flexbox-container {
    flex-direction: column-reverse;
  }
  header {
    display: flex;
    justify-content: flex-start;
    width: min(1200px, 90%);
    font-size: 6vw;
  }
  #header-logo {
    max-width: 30vw;
  }
  #column1 {
    height: 400px;
    width: 83vw;
    align-self: center;
    margin-bottom: 40px;
  }
  #column2 {
    margin-right: 0px;
  }
  .options {
    margin-right: 10px;
  }
  #wave {
    height: 300px;
    width: 1080px;
  }
}
</style>
