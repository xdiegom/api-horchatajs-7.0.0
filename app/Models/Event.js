'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Organizer = use('App/Models/Organizer');

class Event extends Model {
  organizer() {
    this.belongsTo(Organizer);
  }
}

module.exports = Event;
