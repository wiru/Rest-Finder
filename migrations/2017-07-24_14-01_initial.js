export function up(knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments().index();

    table.float("latitude");

    table.float("longitude");

    table.text("name").notNullable();
  });
}

export function down(knex, Promise) {
  return knex.schema.dropTableIfExists("locations");
}
