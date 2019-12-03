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

  // getTables: (restaurantId, searchParameters) => {

  // },

  makeReservation: (restaurantId, tableId) => {
    const query = {
      id: tableId,
      restaurant_id: restaurantId,
    };

    return model.makeReservation(query)
      .then((dbTableInstance) => {
        const table = {
          id: dbTableInstance.dataValues.id,
          date: dbTableInstance.dataValues.date,
          time: dbTableInstance.dataValues.time,
          isOpen: dbTableInstance.dataValues.is_open,
        };

        return table;
      });
  },
};
