const {DataTypes, Sequelize} = require('sequelize');

const sequelize = new Sequelize('maisondb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;