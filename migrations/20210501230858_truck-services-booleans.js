exports.up = function(knex) {
    return knex.schema.table("locations", function(table) {
      table.boolean("hasOilChange");
  
      table.boolean("hasLightMechanical");
  
      table.boolean("hasTireCare");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("locations", function(table) {
      table.dropColumns(["hasOilChange", "hasLightMechanical", "hasTireCare"]);
    });
  };
