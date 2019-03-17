'use strict';
/** @type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Event Functional Test');
trait('Test/ApiClient');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Organizer = 'App/Models/Organizer';
const Event = 'App/Models/Event';
const Bumblebee = use('Adonis/Addons/Bumblebee');
const EventOrganizerTransformer = use(
  'App/Transformers/EventOrganizerTransformer'
);

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
  let transformed = await Bumblebee.create()
    .item(organizer)
    .transformWith(EventOrganizerTransformer)
    .toArray();

  response.assertStatus(200).assertJSONSubset([
    {
      organizer: transformed
    }
  ]);
});

test("it gets paginated events if query parameter 'page' is presented in url", async ({
  assert,
  client
}) => {
  await Factory.model('App/Models/Event').createMany(6);

  const response = await client.get('api/site/v1/events?page=1').end();

  response.assertStatus(200);
  assert.hasAnyKeys(response.body, ['pagination', 'data']);
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

  let transformed = await Bumblebee.create()
    .item(organizer)
    .transformWith(EventOrganizerTransformer)
    .toArray();

  response.assertStatus(200).assertJSONSubset({
    organizer: transformed
  });
});
