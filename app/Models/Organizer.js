'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Event = use('App/Models/Event');

class Organizer extends Model {
  events() {
    return this.hasMany(Event);
  }
}

module.exports = Organizer;
