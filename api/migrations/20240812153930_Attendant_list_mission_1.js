/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('attendant_mission_1', table => {
    table.increments();
    table.string('patient_last_name', 250)
    table.foreign('patient_last_name').references('last_name').inTable('patient_mission_1').onDelete('CASCADE');
    table.string('first_name', 250);
    table.string('last_name', 250);
    table.string('enplane', 100);
    table.string('deplane', 100);
    table.integer('age', 100);
    table.string('gender', 100);
    table.integer('passenger_weight');
    table.string('grade', 100);
    table.string('created_on', 100);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attendant_mission_1');
};
