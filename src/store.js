import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    stateFinder: [],
    currentState: "",
    cityFinder: [],
    selectedOptions: "",
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
    setSelectedState(state, selectedState) {
      state.currentState = selectedState;
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
      console.log("Hi");
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
      // console.log(state.stateCoordinates);
      // console.log("THIS IS STATE COORDS", stateCoords);
    },
    setCityCoordinates(state, cityCoords) {
      state.cityCoordinates = cityCoords;
      // console.log(state.cityCoordinates);
      // console.log("THIS IS COORDS", cityCoords);
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        // console.log(this.state.selectedOptions);
        const locations = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allLocations {
                  name
                  latitude
                  longitude
                  subtype
              }}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.data.allLocations);
            return res.data.allLocations;
          });
        const markers = locations.map((location) => ({
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
          //"{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }"
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
            // console.log(res.data.allStates);
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
              allCities(state: "${this.state.currentState}")
              }`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.data.allCities);
            return res.data.allCities;
          });
        commit("setCityList", cities);
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
      // console.log("HIPPPPPPPPP")
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
            // console.log(res.data.allCityCoords);
            return res.data.allCityCoords;
          });
        commit("setCityCoordinates", cityCoords);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
