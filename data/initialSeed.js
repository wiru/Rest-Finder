const fs = require("fs");
const db = require("../server/knex.js");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  console.log(`BEFORE ...`);
  const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
  console.log(`TEST ${locations}`);
  const promiseTable = [];
  let i = 0;
  for (const location of locations) {
    // const id = location.Site.SiteId;
    const latitude = location.Site.Latitude;
    const longitude = location.Site.Longitude;
    const name = location.Site.SiteName;

    promiseTable.push(
      db("locations").insert({
        latitude: latitude,
        longitude: longitude,
        name: name,
      })
    );
    console.log(`Inserting record ${++i} - /${name} into database... `);
  }

  return knex("locations")
    .del()
    .then(() => {
      return Promise.all(promiseTable);
    });
};
