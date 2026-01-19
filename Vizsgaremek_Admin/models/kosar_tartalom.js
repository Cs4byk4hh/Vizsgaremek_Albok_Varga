const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const kosar_tartalom = sequelize.define('kosar_tartalom', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    kosar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'kosar',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    parfum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mennyiseg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    ar: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = kosar_tartalom;