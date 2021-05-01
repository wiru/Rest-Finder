exports.up = function(knex) {
  return knex.schema.table("locations", function(table) {
    table.text("phone");

    table.text("fax");
  });
};

exports.down = function(knex) {
  return knex.schema.table("locations", function(table) {
    table.dropColumns(["phone", "fax"]);
  });
};
