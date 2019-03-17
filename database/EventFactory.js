/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const moment = require('moment');
Factory.blueprint('App/Models/Event', faker => {
  const day = Math.floor(Math.random() * 5);
  const hoursToAdd = Math.floor(Math.random() * 12);

  const today = new Date(2019, 4, day, 8);
  const start_date = moment(today);
  const end_date = moment(today)
    .add(day, 'd')
    .add(hoursToAdd, 'h');

  return {
    title: faker.sentence({ words: 10 }),
    description: faker.paragraph(),
    start_date: start_date.format('YYYY-MM-DD HH:mm:ss'),
    end_date: end_date.format('YYYY-MM-DD HH:mm:ss')
  };
});
