'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizerSchema extends Schema {
  up () {
    this.create('organizers', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('organizers')
  }
}

module.exports = OrganizerSchema
