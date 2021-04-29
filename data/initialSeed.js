const fs = require("fs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      const locations = JSON.parse(fs.readFileSync("../data/locations.json"));
      for (const location of locations) {
        const latitude = location.Site.Latitude;
        const longitude = location.Site.Longitude;
        const name = location.Site.SiteName;
      
      promiseTable.push(db("locations").insert())
      return knex('locations').insert([
        {latitude: 'rowValue1'},
        {longitude: 'rowValue2'},
        {name: 'rowValue3'}
      ]);
    });
};
