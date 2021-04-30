import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations;
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
              allLocations {
                  name
                  subtype
                  latitude
                  longitude
                  address1
                  city 
                  state
                  zip_code
                  highway
                  exit
              }}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.data.allLocations);
            return res.data.allLocations;
          });
        const markers = locations.map((location) => ({
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
  },
});
