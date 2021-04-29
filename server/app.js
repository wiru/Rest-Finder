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
  }

  type Location {
    id: ID!
    latitude: Float!
    longitude: Float!
    name: String!
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
