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
    allLocations(state: String, city: String, highway: String): [Location]
    allStates: [String]
    allCities(state: String): [String]
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
<<<<<<< HEAD
    state: String!
    city: String!
    highway: String!
    zip_code: String!
    address1: String!
    subtype: String!
    exit: String!
=======
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
>>>>>>> 5e05a072cee52de0ce90c1aaae5b16b93b6403f1
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
    // select state,avg(latitude) as avglat, avg(longitude) as avglg from locations group by state;
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
          console.log(data);
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
