exports.up = function (knex) {
    return knex.schema.table('locations', function (table) {
        table.text("address1");

        table.text("address2");

        table.text("zip_code");

        table.text("exit");
    })
};

exports.down = function (knex) {
    return knex.schema.table('locations', function (table) {
        table.dropColumns(["address1", "address2", "zip", "exit"])
    })
};
