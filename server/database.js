const Sequelize = require('sequelize');


const sequelize = new Sequelize('YumNoms', 'student', 'student', {
  dialect: 'mysql',
  port: 3306,
});

const Restaurant = sequelize.define('Restaurant', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  min_party: Sequelize.INTEGER,
  max_party: Sequelize.INTEGER,
  open: Sequelize.TIME,
  close: Sequelize.TIME,
}, { underscored: true });

const Table = sequelize.define('Table', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: Sequelize.INTEGER,
  date: Sequelize.DATEONLY,
  time: Sequelize.TIME,
  min_seating: Sequelize.INTEGER,
  max_seating: Sequelize.INTEGER,
  is_open: { type: Sequelize.BOOLEAN, defaultValue: true },
}, { underscored: true });

Table.belongsTo(Restaurant);
Restaurant.hasMany(Table, { as: 'Offerings' });


module.exports = {
  Table,
  Restaurant,
  initialize: () => {
    sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ force: true });
      })
      .then(() => {
        console.log('Database tables synced!');
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
