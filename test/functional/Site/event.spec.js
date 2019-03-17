'use strict';
/** @type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Event Functional Test');
trait('Test/ApiClient');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Organizer = 'App/Models/Organizer';
const Event = 'App/Models/Event';

test('it displays all events', async ({ client }) => {
  const organizer = await Factory.model(Organizer).create();

  const event = await Factory.model(Event).create();
  await organizer.events().save(event);

  const response = await client.get('api/site/v1/events').end();

  response.assertStatus(200).assertJSONSubset([{ title: event.title }]);
});

test('it displays all events with their organizer', async ({ client }) => {
  const organizer = await Factory.model(Organizer).create();
  await organizer.events().save(await Factory.model(Event).make());

  const response = await client.get('api/site/v1/events').end();

  response.assertStatus(200).assertJSONSubset([
    {
      organizer: organizer.toJSON()
    }
  ]);
});

test('it display a single event', async ({ client }) => {
  const event = await Factory.model(Event).create();

  const response = await client.get(`api/site/v1/events/${event.id}`).end();

  response.assertStatus(200).assertJSONSubset({
    title: event.title
  });
});

test('it display a single event with its organizer', async ({ client }) => {
  const event = await Factory.model(Event).make();

  const organizer = await Factory.model(Organizer).create();
  await organizer.events().save(event);

  const response = await client.get(`api/site/v1/events/${event.id}`).end();

  response.assertStatus(200).assertJSONSubset({
    organizer: organizer.toJSON()
  });
});
