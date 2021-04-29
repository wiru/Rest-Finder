<template>
  <div id="app">
    <header>
      <h1>Pit Stop</h1>
      <img id="header-logo" src="./assets/croc3.png" />
    </header>
    <div id="flexbox-container">
      <div id="column1">
        <component-1 />
        <component-2 />
        <component-3 />
        <component-4 />
        <component-5 />
      </div>
      <div id="column2">
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
import Map from "./components/Map";

export default {
  name: "app",
  components: {
    Map,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: left top;
  background-color: rgb(0, 0, 0);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-block-start: 0px;
}
header {
  display: flex;
  margin: auto;
  padding: 50px;
  justify-content: center;
  color: rgb(255, 217, 0);
  font-size: 2rem;
}
#header-logo {
  max-width: 150px;
  padding: 10px;
  height: auto;
  object-fit: cover;
}
#flexbox-container {
  display: flex;
  flex-direction: row;
}
#column1 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
#column2 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 2;
}
</style>
