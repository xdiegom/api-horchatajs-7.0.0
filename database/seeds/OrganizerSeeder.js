'use strict';

/*
|--------------------------------------------------------------------------
| OrganizerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class OrganizerSeeder {
  async run() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const organizers = await Factory.model('App/Models/Organizer').createMany(
      randomNumber
    );

    for (let i = 0; i < organizers.length; i++) {
      const organizer = organizers[i];
      const events = await Factory.model('App/Models/Event').makeMany(
        randomNumber
      );

      await organizer.events().saveMany(events);
    }
  }
}

module.exports = OrganizerSeeder;
