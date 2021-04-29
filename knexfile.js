// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./data",
    },
  },
  staging: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./data",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./data",
    },
  },
};
