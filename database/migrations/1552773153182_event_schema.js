'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments();
      table
        .integer('organizer_id')
        .unsigned()
        .references('id')
        .inTable('organizers');
      table.string('title');
      table.text('description');
      table.date('start_date');
      table.date('end_date');
      table.time('start_hour')
      table.time('end_hour')

      table.timestamps();
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
