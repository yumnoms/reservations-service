const db = require('./database.js');


module.exports = {
  getInfo: (restaurantId) => db.Restaurant.findOne({ where: { id: restaurantId } }),

  getTables: (restaurantId, searchParameters) => {
    const query = searchParameters;
    query.restaurant_id = restaurantId;

    return db.Table.findAll({ where: query });
  },

  // makeReservations: (restaurantId, tableId) => {

  // },
};
