/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/Organizer', faker => {
    return {
      name: faker.company(),
      description: faker.paragraph()
    };
  });