exports.up = function (knex) {
    return knex.schema.table('locations', function (table) {
        table.text("state");

        table.text("city");

        table.text("highway");
    })
};

exports.down = function (knex) {
    return knex.schema.table('locations', function (table) {
        table.dropColumns(["state", "city", "highway"])
    })
};
