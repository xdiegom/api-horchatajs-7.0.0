'use strict';
/** @type {import('@adonisjs/vow/src/Suite')} */

const { test, trait } = use('Test/Suite')('Organizers Test');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');

test('it displays all organizers', async ({ assert, client }) => {
  try {
    const organizers = await Factory.model('App/Models/Organizer').createMany(
      5
    );
    const organizer = organizers[0];
    const response = await client.get('api/site/v1/organizers').end();

    response.assertStatus(200);
    response.assertJSONSubset([
      {
        name: organizer.name
      }
    ]);
  } catch (error) {
    console.log(error);
  }
});

test('it displays a single organizer', async ({ assert, client }) => {
  try {
    const organizer = await Factory.model('App/Models/Organizer').create();

    const response = await client
      .get(`api/site/v1/organizers/${organizer.id}`)
      .end();

    response.assertStatus(200);
    assert.equal(response.body.name, organizer.name);
  } catch (error) {
    console.log(error);
  }
});
