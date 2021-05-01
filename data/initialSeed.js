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
    const subtype = location.FacilitySubtype.Name;
    const exit = location.Site.ExitNumber;
    const address1 = location.Addresses[0].Address1;
    const address2 = location.Addresses[0].Address2;
    const zip = location.Addresses[0].Zip;
    let phone;
    let fax;
    const restaurants = [];
    const truck_services = []; // get rid of this on cleanup
    let hasOilChange = false; // (hasOilChange: )
    let hasLightMechanical = false;
    let hasTireCare = false;

    for (const customField of location.CustomFields) {
      if (customField.CustomField.Label === 'Commercial Truck Oil Change') {
        hasOilChange = true;
      }
      if (customField.CustomField.Label === 'Light Mechanical') {
        hasLightMechanical = true;
      }
      if (customField.CustomField.DisplayName === 'Truck Tire Care') {
        hasTireCare = true;
      }
    }

    for (const concept of location.Site.Concepts) {
      restaurants.push(concept.Concept.Name);
    }

    for (const contactMethod of location.ContactMethods) {
      if (contactMethod.Type.Name === "Main Phone") {
        phone = contactMethod.Data;
      }
      if (contactMethod.Type.Name === "Fax") {
        fax = contactMethod.Data;
      }
    }

    promiseTable.push(
      db("locations").insert({
        latitude: latitude,
        longitude: longitude,
        name: name,
        state: state,
        city: city,
        highway: highway,
        subtype: subtype,
        exit: exit,
        address1: address1,
        address2: address2,
        zip_code: zip,
        phone: phone,
        fax: fax,
        restaurants: restaurants,
        truck_services: truck_services, // get rid of this on cleanup
        hasOilChange: hasOilChange,
        hasLightMechanical: hasLightMechanical,
        hasTireCare: hasTireCare,
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
