const Sequelize = require('sequelize');
const model = require('./model.js');


module.exports = {
  getInfo: (restaurantId) => {
    const promises = [
      model.getInfo(restaurantId),
      model.getTables(restaurantId, { is_open: true }),
    ];

    return Promise.all(promises)
      .then((values) => {
        const restaurant = values[0];
        const tables = values[1];

        const availableDates = new Set();

        Array.from(tables).forEach((table) => {
          availableDates.add(table.dataValues.date);
        });

        const info = {
          name: restaurant.dataValues.name,
          min: restaurant.dataValues.min_party,
          max: restaurant.dataValues.max_party,
          open: restaurant.dataValues.open,
          close: restaurant.dataValues.close,
          dates: Array.from(availableDates),
        };

        return info;
      });
  },

  getTables: (restaurantId, searchParameters) => {
    const query = {
      date: searchParameters.date,
      time: searchParameters.time,
      min_seating: { [Sequelize.Op.lte]: searchParameters.people },
      max_seating: { [Sequelize.Op.gte]: searchParameters.people },
    };

    return Promise.all(model.getTables(restaurantId, query))
      .then((dbTablesInstances) => {
        const tables = [];

        Array.from(dbTablesInstances).forEach((dbTableInstance) => {
          const table = {
            id: dbTableInstance.dataValues.id,
            date: dbTableInstance.dataValues.date,
            time: dbTableInstance.dataValues.time,
            isOpen: dbTableInstance.dataValues.is_open,
          };

          tables.push(table);
        });

        return tables;
      });
  },

  // makeReservations: (restaurantId, tableId) => {

  // },
};
