import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    stateFinder: [],
    currentState: "",
    cityFinder: [],
    highwayFinder: [],
    selectedOptions: "",
    selectedHighwayState: "",
    selectedCityState: "",
    stateCoordinates: [],
    cityCoordinates: [],
    selectedZoom: 4,
    selectedLatitude: 38.7392,
    selectedLongitude: -97.9903,
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations;
    },
    setStateList(state, stateFinder) {
      state.stateFinder = stateFinder;
    },
    setCityList(state, cityFinder) {
      state.cityFinder = cityFinder;
    },
    setHighwayList(state, highwayFinder) {
      state.highwayFinder = highwayFinder;
    },
    setSelectedState(state, input) {
      state.currentState = input;
    },
    setSelectedHighwayState(state, input) {
      state.selectedHighwayState = input;
    },
    setSelectedCityState(state, input) {
      state.selectedCityState = input;
    },
    setSelectedOptions(state, selectedOptions) {
      state.selectedOptions = selectedOptions;
    },
    setGoogleStateView(state, index) {
      state.selectedLatitude = state.stateCoordinates[index].latitude;
      state.selectedLongitude = state.stateCoordinates[index].longitude;
      state.selectedZoom = 6;
    },
    setGoogleCityView(state, input) {
      let selectedCity = state.cityCoordinates.find(function(cityObj) {
        if (cityObj.city == input) return true;
      });
      state.selectedLatitude = selectedCity.latitude;
      state.selectedLongitude = selectedCity.longitude;
      state.selectedZoom = 8;
    },
    resetGoogleView() {
      this.state.selectedLatitude = 38.7392;
      this.state.selectedLongitude = -97.9903;
      this.state.selectedZoom = 4;
      document.getElementById("state-select").selectedIndex = 0;
      document.getElementById("city-select").selectedIndex = 0;
    },
    setStateCoordinates(state, stateCoords) {
      state.stateCoordinates = stateCoords;
    },
    setCityCoordinates(state, cityCoords) {
      state.cityCoordinates = cityCoords;
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const locations = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allLocations${this.state.selectedOptions}{
                  name
                  latitude
                  longitude
                  subtype
              }}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allLocations;
          });
        const markers = locations.map((location) => ({
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
          icon: `http://maps.google.com/mapfiles/ms/icons/${
            location.subtype === "Travel Stop" ? "blue" : "red"
          }-dot.png`,
          defaultAnimation: 2,
        }));
        commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },

    async loadStates({ commit }) {
      try {
        const states = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allStates
              }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allStates;
          });
        commit("setStateList", states);
      } catch (err) {
        console.error(err);
      }
    },
    async loadCities({ commit }) {
      try {
        const cities = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allCities${this.state.selectedHighwayState}
              }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allCities;
          });
        commit("setCityList", cities);
      } catch (err) {
        console.error(err);
      }
    },

    async loadHighways({ commit }) {
      try {
        const highways = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allHighways${this.state.selectedCityState} 
              }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allHighways;
          });
        commit("setHighwayList", highways);
      } catch (err) {
        console.error(err);
      }
    },
    async loadStateCoords({ commit }) {
      try {
        const statesCoords = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allStateCoords {
                state
                latitude
                longitude
              }
            }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allStateCoords;
          });
        commit("setStateCoordinates", statesCoords);
      } catch (err) {
        console.error(err);
      }
    },
    async loadCityCoords({ commit }) {
      try {
        const cityCoords = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allCityCoords {
                city
                latitude
                longitude
              }
            }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data.allCityCoords;
          });
        commit("setCityCoordinates", cityCoords);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
