<template>
  <div class="options">
    <form>
	    <select name="location" id="state-select" @change="optionsChange">
		    <option value="location" v-for="location in this.$store.state.stateFinder" :key="location">{{location}}
         </option>
	    </select>
    </form>
  </div>
</template>

<script>
//Need to bring location data from the store here to be used for the dynamic dropdown
//I made a mock up of what it should "sort of" look like based off research
//v-model is used for two way binding. V-for renders element multiple times based on amount of options
//current state is not dynamic
export default {
    mounted() {
    this.getStates();
  },
	data: function() {
     return { 
		 stateFinder : this.$store.state.stateFinder,
     }
  },
  name: "FilterByState",
  props: ["location"],
  methods: {
	getStates() {
		this.$store.dispatch("loadStates")
	},
	optionsChange(event) {
		console.log("HI!!!!")
		let result = "(";
		// State
		const e = document.getElementById("state-select");
		const stateSelect = e.options[e.selectedIndex].text;
		stateSelect?result += (`state: "${stateSelect}"`) : 0 ;
		// // City
		// const f = document.getElementById("city-select");
		// const citySelect = e.options[e.selectedIndex].text;
		// (stateSelect&&citySelect)?result.concat(", ") : 0 ;
		// citySelect?result.concat("city: " + citySelect) : 0 ;
		// // Highway
		// const g = document.getElementById("highway-select");
		// const highwaySelect = e.options[e.selectedIndex].text;
		// (citySelect&&highwaySelect||citySelect&&highwaySelect)?result.concat(", ") : 0 ;
		// highwaySelect?result.concat("highway: " + highwaySelect):0;		
		result += (")");
		console.log("THIS IS THE RESULT", result);
		this.$store.commit("setSelectedOptions", result); 
		this.$store.dispatch("loadMarkers");

		// call loadMarkers or not. 
	}
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#state-select {
	width: 200px
}

</style>    





