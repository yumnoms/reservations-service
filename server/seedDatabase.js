// const Sequelize = require('sequelize');
const faker = require('faker');


const numberOfRestaurants = 10;
const numberOfTables = 100;


module.exports.restaurants = (Restaurant) => {
  const promises = [];

  for (let i = 0; i < numberOfRestaurants; i += 1) {
    const newEntry = {
      name: faker.commerce.productName(),
      min_party: faker.random.number({ min: 1, max: 2 }),
      max_party: faker.random.arrayElement([4, 6, 8, 10]),
      open: `${faker.random.number({ min: 9, max: 16 })}:${faker.random.arrayElement(['00', '30'])}:00`,
      close: `${faker.random.number({ min: 20, max: 23 })}:${faker.random.arrayElement(['00', '30'])}:00`,
    };

    promises.push(Restaurant.create(newEntry));
  }

  return Promise.all(promises);
};

module.exports.tables = (Table, Restaurant) => {
  const promises = [];

  for (let i = 0; i < numberOfTables; i += 1) {
    const restaurantId = faker.random.number({ min: 1, max: numberOfRestaurants });

    Restaurant.findOne({ where: { id: restaurantId } })
      .then((restaurant) => {
        const info = restaurant.dataValues;
        const tableSize = 2 * faker.random.number({ min: 1, max: (info.max_party / 2) });
        let startTime = `${faker.random.number({ min: 9, max: 23 })}:${faker.random.arrayElement(['00', '15', '30', '45'])}:00`;

        while (startTime < info.open && startTime > info.close) {
          startTime = `${faker.random.number({ min: 9, max: 23 })}:${faker.random.arrayElement(['00', '15', '30', '45'])}:00`;
        }

        const newEntry = {
          restaurant_id: restaurantId,
          date: faker.date.recent(-7),
          time: startTime,
          min_seating: tableSize - 1,
          max_seating: tableSize,
          is_open: faker.random.boolean(),
        };

        promises.push(Table.create(newEntry));
      });
  }

  return Promise.all(promises);
};
