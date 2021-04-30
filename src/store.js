import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    stateFinder: [],
    selectedOptions: ""
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations;
    },
    setStateList(state, stateFinder) {
      state.stateFinder = stateFinder;
      //  console.log("stateFINDER", stateFinder)
    },
    setSelectedOptions(state, selectedOptions) {
      state.selectedOptions = selectedOptions;
      console.log("THIS IS SELECTED OPTIONS", selectedOptions)
    }
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const locations = await fetch("/graphql?", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              allLocations${this.state.selectedOptions} { 
                  subtype
                  latitude
                  longitude
              }}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.data.allLocations);
            return res.data.allLocations;
          });
        const markers = locations.map((location) => (
          {
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
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
            console.log(res.data.allStates);
            return res.data.allStates;
          });
        commit("setStateList", states);
      } catch (err) {
        console.error(err);
      }
    },
  },
});



// fetch("/graphql?", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     query: `{
//       allLocations${$state.selectedOptions} { 
//           state
//       }}`,
//   }),
// })
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res.data.allLocations);
//     return res.data.allLocations
//   }),