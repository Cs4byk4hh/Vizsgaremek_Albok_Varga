const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const perfumes = sequelize.define('perfumes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    volume_ml: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('ferfi', 'no', 'uniszex'),
        allowNull: false
    },
    season_spring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    season_summer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    season_autumn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    season_winter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    sweet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    spicy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = perfumes;