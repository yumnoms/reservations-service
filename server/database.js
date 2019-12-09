const Sequelize = require('sequelize');


const database = process.env.TEST ? 'YumNomsReservations_TEST' : 'YumNomsReservations';
const sequelize = new Sequelize(database, 'student', 'student', {
  dialect: 'mysql',
  port: 3350,
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
  sequelize,
  Table,
  Restaurant,
  initialize: () => (
    sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ force: !!process.env.TEST });
      })
      .then(() => {
        console.log('Database tables synced!');
      })
      .catch((err) => {
        console.log(err);
      })
  ),
};
