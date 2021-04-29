require("dotenv").config();
const app = require("./app");
const db = require("./knex");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    console.log("Running migrations");
    await db.migrate.latest();

    console.log("Starting express");
    app.listen({ port: 4000 }, () => console.log("YoYO!"));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
