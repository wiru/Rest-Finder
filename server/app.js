const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex");

const app = express();

// SCHEMA
const typeDefs = gql`
  type Query {
    allLocations(
      state: String
      city: String
      highway: String
      truck_services: String
      subtype: String
      hasOilChange: Boolean
      hasLightMechanical: Boolean
      hasTireCare: Boolean
    ): [Location]
    allStates: [String]
    allCities(state: String, highway: String): [String]
    allHighways(state: String, city: String): [String]
    allStateCoords: [stateCoordinate]
    allCityCoords: [cityCoordinate]
    singleLocation(locationName: String): [Location]
  }

  type stateCoordinate {
    latitude: Float
    longitude: Float
    state: String
  }

  type cityCoordinate {
    latitude: Float
    longitude: Float
    city: String
  }

  type Location {
    id: ID!
    latitude: Float!
    longitude: Float!
    name: String!
    state: String
    city: String
    highway: String
    zip_code: String
    address1: String
    subtype: String
    exit: String
    phone: String
    fax: String
    restaurants: [String]
    hasLightMechanical: Boolean
    hasOilChange: Boolean
    hasTireCare: Boolean
  }
`;

// RESOLVER
const resolvers = {
  Query: {
    allLocations: (parent, args) => {
      let beforeFilterPromise = db.select("*").from("locations");
      if (args.state) {
        beforeFilterPromise = beforeFilterPromise.where("state", args.state);
      }
      if (args.city) {
        beforeFilterPromise = beforeFilterPromise.where("city", args.city);
      }
      if (args.highway) {
        beforeFilterPromise = beforeFilterPromise.where("highway", args.highway);
      }
      if (args.subtype) {
        beforeFilterPromise = beforeFilterPromise.where("subtype", args.subtype);
      }
      if (args.hasOilChange) {
        beforeFilterPromise = beforeFilterPromise.where("hasOilChange", args.hasOilChange)
      }
      if (args.hasLightMechanical) {
        beforeFilterPromise = beforeFilterPromise.where("hasOilChange", args.hasLightMechanical)
      }
      if (args.hasTireCare) {
        beforeFilterPromise = beforeFilterPromise.where("hasOilChange", args.hasTireCare)
      }
      return beforeFilterPromise;
    },
    allStates: () => {
      return db
        .select("state")
        .distinct("state")
        .orderBy("state")
        .from("locations")
        .then((data) => {
          // the DB query returns an array of objects { state: "TX" }. We want to return an array of strings.
          return data.map((stateObj) => stateObj.state);
        });
    },
    allCities: (_, args) => {
      const commonPromise = db
        .select("city")
        .distinct("city")
        .orderBy("city")
        .from("locations");
      if (args.state) {
        return commonPromise.where("state", args.state).then((data) => {
          return data.map((cityObj) => cityObj.city);
        });
      } else {
        return commonPromise.then((data) => {
          return data.map((cityObj) => cityObj.city);
        });
      }
    },
    allHighways: (_, args) => {
      const commonPromise = db
        .select("highway")
        .distinct("highway")
        .orderBy("highway")
        .from("locations")
        .groupBy("highway")
        .avg("latitude as latitude")
        .avg("longitude as longitude")
      if (args.state && args.city) {
        return commonPromise
          .where("state", args.state)
          .where("city", args.city)
          .then((data) => {
            return data.map((highwayObj) => {
              return highwayObj.highway;
            });
          });
      } else if (args.state) {
        return commonPromise.where("state", args.state).then((data) => {
          return data.map((highwayObj) => {
            return highwayObj.highway;
          });
        });
      } else if (args.city) {
        return commonPromise.where("city", args.city).then((data) => {
          return data.filter((highwayObj) => !!highwayObj.highway).map((highwayObj) => highwayObj.highway);
        });
      } else {
        return commonPromise.then((data) => {
          return data.filter((highwayObj) => !!highwayObj.highway).map((highwayObj) => highwayObj.highway);
        });
      }
    },
    allStateCoords: () => {
      return db
        .select("state")
        .distinct("state")
        .orderBy("state")
        .from("locations")
        .groupBy("state")
        .avg("latitude as latitude")
        .avg("longitude as longitude")
        .then((data) => {
          return data;
        });
    },
    allCityCoords: () => {
      return db
        .select("city", "latitude", "longitude")
        .orderBy("city")
        .from("locations")
        .then((data) => {
          return data;
        });
    },
    singleLocation: (_, args) => {
      return db
        .select("*")
        .from("locations")
        .where("name", args.locationName)
        .then((data) => {
          return data;
        });
    },
  },
};

// Setup Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(cors());

app.use(express.static(__dirname));

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));

module.exports = app;
