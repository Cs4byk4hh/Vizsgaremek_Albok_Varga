const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const velemenyek = sequelize.define('velemenyek', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    opinion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = velemenyek;