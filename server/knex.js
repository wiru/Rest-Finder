require("dotenv").config();
const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL || {
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
  searchPath: "public",
});

module.exports = db;
