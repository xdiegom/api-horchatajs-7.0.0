'use strict';

/** @type {import('@adonisjs/vow/src/Suite')} */
const { test } = use('Test/Suite')('Organizers Unit Test');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Event = 'App/Models/Event';
const Organizer = 'App/Models/Organizer';


test('it belongs to an Organizer', async ({ assert }) => {
  const event = await Factory.model(Event).make();
  const organizer = await Factory.model(Organizer).create();

  await organizer.events().save(event);

  assert.equal((await event.organizer().fetch()).name, organizer.name);
});
