/** @type {import('@adonisjs/vow/src/Suite')} */
const { test } = use('Test/Suite')('Organizers Unit Test');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

test('an organizer has many events', async ({ assert }) => {
  const organizer = await Factory.model('App/Models/Organizer').create();
  let events = await Factory.model('App/Models/Event').makeMany(5);

  await organizer.events().saveMany(events);

  events = await organizer.events().fetch();

  assert.equal(events.toJSON().length, 5);
});
