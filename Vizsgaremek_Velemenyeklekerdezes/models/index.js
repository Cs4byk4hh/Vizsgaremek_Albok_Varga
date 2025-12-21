const sequelize = require('../config/db');
const felhasznalok = require('./felhasznalok');
const velemenyek = require('./velemenyek');
const perfumes = require('./perfumes');

module.exports = {
    sequelize,
    felhasznalok,
    velemenyek,
    perfumes
};