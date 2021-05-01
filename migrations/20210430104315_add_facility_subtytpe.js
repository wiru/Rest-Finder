exports.up = function(knex) {
  return knex.schema.table("locations", function(table) {
    table.text("subtype");
  });
};

exports.down = function(knex) {
  return knex.schema.table("locations", function(table) {
    table.dropColumn("subtype");
  });
};
