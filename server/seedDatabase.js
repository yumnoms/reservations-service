const faker = require('faker');
const db = require('./database.js');


const numberOfRestaurants = process.env.TEST ? 1 : 100;
const numberOfTables = process.env.TEST ? 100 : 100000;


const first = [
  'Anchor',
  'Bon',
  'Chon',
  'Buffalo',
  'Wild',
  'Chicken',
  'Salad',
  'Dell',
  'Rhea\'s',
  'Grandy\'s',
  'Gus\'s',
  'World',
  'Famous',
  'Fried',
  'Lee\'s',
  'Ma',
  'Yu',
  'Ching\'s',
  'Bucket',
  'Pollo',
  'Ranch',
  'Rostipollos',
  'Roscoe\'s',
  'House of',
  'Slim',
  'Smithfield\'s',
  'St.',
  'Swiss',
  'Tip-Top',
  'White',
  'Coffee',
  'Fence',
  'Wing',
  'American',
  'Boston',
  'Famous',
  'Brown\'s',
  'California',
  'Rice',
  'Cluck',
  'Dixie',
  'Lee',
  'Flav\'s',
  'Golden',
  'Hillbilly\'s',
  'Kennedy',
  'Kyochon',
  'Louisiana',
  'Los Pollos',
  'Nando\'s',
  'Mrs.',
  'Winner\'s',
  'Pioneer',
  'Raising',
  'Red',
  'Roy',
  'Royal',
  'Southern',
  'Tastee',
  'Wild',
  'Wing',
];

const second = [
  'Recipe',
  'Street',
  'Zone',
  'Castle',
  'Loco',
  'Hermanos',
  'Skillet',
  'International',
  'Blast',
  'Cottage',
  'Delight',
  'Express',
  'Hut',
  'Licken',
  'Rotisserie',
  'Shop',
  '& Pasta',
  'Market',
  '\'n Biscuits',
  'Bar',
  'Chicken',
  'Wings',
  'Chick',
  'Inn',
  'Way',
  'Basket',
  'House',
  'Tropical',
  'and Waffles',
  'Chickens',
  'Bar-B-Q',
  'BBQ',
  'Chalet',
  'Restaurant',
  'Pot',
  'Farm',
];

const generateName = () => {
  let name = '';
  const length = Math.ceil(Math.random() * 3 + 1);
  for (let i = 0; i < length; i += 1) {
    if (i === length - 1) {
      name += faker.random.arrayElement(second);
    } else {
      name += `${faker.random.arrayElement(first)} `;
    }
  }

  return name;
};

const seedRestaurants = () => {
  const promises = [];

  for (let i = 0; i < numberOfRestaurants; i += 1) {
    const newEntry = {
      name: generateName(),
      min_party: faker.random.number({ min: 1, max: 2 }),
      max_party: faker.random.arrayElement([4, 6, 8, 10]),
      open: `${faker.random.number({ min: 9, max: 16 })}:${faker.random.arrayElement(['00', '30'])}:00`,
      close: `${faker.random.number({ min: 20, max: 23 })}:${faker.random.arrayElement(['00', '30'])}:00`,
    };

    promises.push(db.Restaurant.create(newEntry));
  }

  return Promise.all(promises);
};

const seedTables = () => {
  const promises = [];

  for (let i = 0; i < numberOfTables; i += 1) {
    const restaurantId = faker.random.number({ min: 1, max: numberOfRestaurants });

    promises.push(
      db.Restaurant.findOne({ where: { id: restaurantId } })
        .then((restaurant) => {
          const info = restaurant.dataValues;
          const tableSize = 2 * faker.random.number({ min: 1, max: (info.max_party / 2) });
          let startTime = `${faker.random.number({ min: 9, max: 23 })}:${faker.random.arrayElement(['00', '15', '30', '45'])}:00`;

          while (startTime < info.open || startTime > info.close) {
            startTime = `${faker.random.number({ min: 9, max: 23 })}:${faker.random.arrayElement(['00', '15', '30', '45'])}:00`;
          }

          const newEntry = {
            restaurant_id: restaurant.dataValues.id,
            date: faker.date.recent(process.env.TEST ? -1 : -100),
            time: startTime,
            min_seating: tableSize - 1,
            max_seating: tableSize,
            is_open: process.env.TEST ? true : faker.random.boolean(),
          };

          return db.Table.create(newEntry);
        }),
    );
  }

  return Promise.all(promises);
};


module.exports = (() => (
  db.sequelize.sync({ force: true })
    .then(() => {
      console.log('Successfully synced database!');
      return seedRestaurants();
    })
    .then(() => {
      console.log('Successfully seeded Restaurants!');
      return seedTables();
    })
    .then(() => {
      console.log('Successfully seeded Tables!');
    })
    .catch((err) => {
      console.log('ERROR:', err);
    })
))();
