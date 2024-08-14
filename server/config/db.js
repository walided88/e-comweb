// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MONGO_URI, {
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
