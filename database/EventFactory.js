/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const moment = require('moment');
Factory.blueprint('App/Models/Event', faker => {
  const day = Math.floor(Math.random() * 15 + 1); // start day between 1 and 15
  const year = (new Date()).getFullYear(); // set current year
  const month = Math.floor(Math.random() * 11); // 0 - 11 => January - December
  const daysOfEvent = Math.floor(Math.random() * 2 + 1); // event duration up to 3 days
  const eventHours = Math.floor(Math.random() * 6 + 1); // event length up to 6 hours
  const startsAt = [8, 13]; // Starts at 8 am or 1 pm

  const today = new Date(
    year,
    month,
    day,
    startsAt[Math.floor(Math.random() * 2)]
  );

  const start_date = moment(today);
  const end_date = moment(today)
    .add(daysOfEvent, 'd')
    .add(eventHours, 'h');

  return {
    title: faker.sentence({ words: 10 }),
    description: faker.paragraph(),
    start_date: start_date.format('YYYY-MM-DD HH:mm:ss'),
    end_date: end_date.format('YYYY-MM-DD HH:mm:ss'),
    start_hour: start_date.format('HH:mm:ss'),
    end_hour: end_date.format('HH:mm:ss')
  };
});
