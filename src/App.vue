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
        <FilterByState />
        <!-- v-bind:locations="locations" -->
        <!-- <TruckServices />
        <StopType />
        <Amenities />
        <Restaurants /> -->
      </div>
      <div id="column2">
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
/* import FilterByState from "./components/FilterByState.vue"; */
// import Amenities from "./components/Amenities.vue";
// import Restaurants from "./components/Restaurants.vue";
// import TruckServices from "./components/TruckServices.vue";
// import StopType from "./components/StopType.vue";
import Map from "./components/Map";
import FilterByState from "./components/FilterByState.vue";

export default {
  name: "app",
  components: {
    /* FilterByState, */
    Map,
    // Restaurants,
    // TruckServices,
    // Amenities,
    // StopType,
    FilterByState,
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-block-start: 0px;
  overflow: auto;
}
header {
  display: flex;
  margin: auto;
  width: min(1200px, 75%);
  margin-top: 20px;
  justify-content: left;
  color: rgb(255, 217, 0);
  font-size: 2rem;
  margin-bottom: -20px;
}
#header-logo {
  max-width: 150px;
  padding: 10px;
  height: auto;
  object-fit: cover;
}
h1 {
  font-family: "lobster";
}
#flexbox-container {
  display: flex;
  flex-direction: row;
  width: min(1200px, 90%);
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
  z-index: -1;
}

@media all and (max-width: 1080px) {
  #flexbox-container {
    flex-direction: column-reverse;
  }
  h1 {
    margin-top: auto;
    margin-bottom: auto;
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
