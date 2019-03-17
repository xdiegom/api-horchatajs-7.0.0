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
      table.datetime('start_date');
      table.datetime('end_date');

      table.timestamps();
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
