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
        const { data: locations } = await fetch(
          "http://localhost:4000/graphql?",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `{
              allLocations {
                  name
                  latitude
                  longitude
              }}`,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res.data);
            return res.data;
          });
        // const markers = locations.map((location) => ({
        //   position: {
        //     lat: location.latitude,
        //     lng: location.longitude,
        //   },
        //   key: location.name,
        //   defaultAnimation: 2,
        // }));
        commit("setLocations", []);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
