require("mocha");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");
const app = express();

chai.use(chaiHttp);

describe("GraphQL API Tests", () => {
  it("should fetch locations properly", async () => {
    const response = await chai
      .request("http://localhost:4000")
      .post("/graphql?")
      .send({
        query: `{
          allLocations {
              name
              latitude
              longitude
              subtype
          }}`,
      });
    expect(response.status).to.equal(200);
    const allLocations = response.body.data.allLocations;
    expect(allLocations).to.be.an("array");
    expect(allLocations.length).to.equal(432);
    // Looking for a pre-determined location
    allLocations.forEach((location) => {
      if (location.name === "Site 436") {
        expect(location.latitude).to.equal(40.76995);
        expect(location.longitude).to.equal(-111.93992);
        expect(location.subtype).to.equal("Travel Stop");
      }
    });
  }),
    it("should fetch list of all states properly", async () => {
      const response = await chai
        .request("http://localhost:4000")
        .post("/graphql?")
        .send({
          query: `{
          allStates 
        }`,
        });
      expect(response.status).to.equal(200);
      const allStates = response.body.data.allStates;
      expect(allStates).to.deep.equal([
        "AL",
        "AR",
        "AZ",
        "CA",
        "CO",
        "FL",
        "GA",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MD",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "WA",
        "WI",
        "WV",
        "WY",
      ]);
    });

  it("list of all cities in a state", async () => {
    const response = await chai
      .request("http://localhost:4000")
      .post("/graphql?")
      .send({
        query: `{
          allCities(state: "NY")
        }`,
      });
    expect(response.status).to.equal(200);
    const allCities = response.body.data.allCities;
    expect(allCities).to.deep.equal(["Binghamton", "Canaan"]);
  });

  it("list of all corrdinates of states", async () => {
    const response = await chai
      .request("http://localhost:4000")
      .post("/graphql?")
      .send({
        query: `{
          allStateCoords {
            state
            latitude
            longitude
          }
        }`,
      });
    expect(response.status).to.equal(200);
    const allStateCoords = response.body.data.allStateCoords;
    let isNYinStateList = false; 
    allStateCoords.forEach((stateCoord) => {
      if (stateCoord.state === "NY") {
        isNYinStateList = true;
        expect(stateCoord.latitude).to.equal(42.23213005065918);
        expect(stateCoord.longitude).to.equal(-74.63260269165039);
      }
    });
    expect(isNYinStateList).to.equal(true);
  });

  it("how to fetch a single location", async () => {
    const response = await chai
      .request("http://localhost:4000")
      .post("/graphql?")
      .send({
        query: `{
          singleLocation(locationName: "Site 368") {
            state
            latitude
            longitude
            highway
            subtype
            address1
            zip_code
            phone
            restaurants
          }
        }`,
      });
    expect(response.status).to.equal(200);
    console.log(response.body.data);
    const locationData = response.body.data.singleLocation[0];
    expect(locationData.state).to.equal("AL");
    expect(locationData.latitude).to.equal(32.84415);
    expect(locationData.longitude).to.equal(-86.591965);
    expect(locationData.highway).to.equal("I-65");
    expect(locationData.subtype).to.equal("Travel Stop");
    expect(locationData.address1).to.equal("300 Arby Dr.");
    expect(locationData.phone).to.equal("(205) 755-8104");
    expect(locationData["zip_code"]).to.equal("35045");
    expect(locationData.restaurants).to.deep.equal([ "Arby's" ]);
  });


  
});
