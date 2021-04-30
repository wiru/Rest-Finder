const fs = require("fs");
const db = require("../server/knex.js");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
  const promiseTable = [];
  let i = 0;
  for (const location of locations) {
    const latitude = location.Site.Latitude;
    const longitude = location.Site.Longitude;
    const name = location.Site.SiteName;
    const state = location.Addresses[0].State; // there may be some locations with more than one address? 
    const city = location.Addresses[0].City; // there may be some locations with more than one address? 
    const highway = location.Site.Highway;

    promiseTable.push(
      db("locations").insert({
        latitude: latitude,
        longitude: longitude,
        name: name,
        state: state,
        city: city,
        highway: highway,
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
