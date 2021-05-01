exports.up = function(knex) {
    return knex.schema.table("locations", function(table) {
      table.specificType("truck_services", "text[]");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("locations", function(table) {
      table.dropColumn("truck_services");
    });
  };