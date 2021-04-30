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
    allLocations: [Location]
    allStates: [String]
    allCities(stateId: String): [String]
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
  }
`;

// RESOLVER
const resolvers = {
  Query: {
    allLocations: () => {
      return db
        .select("*")
        .from("locations")
        .then((data) => {
          // console.log(data);
          return data;
        });
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
      if (args.stateId) {
        return commonPromise.where("state", args.stateId).then((data) => {
          return data.map((cityObj) => cityObj.city);
        });
      } else {
        return commonPromise.then((data) => {
          return data.map((cityObj) => cityObj.city);
        });
      }
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

// app.get("/api/locations", async (req, res) => {
//   try {
//     const locations = await db.select().table("locations");
//     res.json(locations);
//   } catch (err) {
//     console.error("Error loading locations!", err);
//     res.sendStatus(500);
//   }
// });

// // Always return the main index.html, since we are developing a single page application
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
// });

module.exports = app;
