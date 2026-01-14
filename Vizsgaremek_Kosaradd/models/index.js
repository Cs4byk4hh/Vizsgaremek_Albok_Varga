const sequelize = require('../config/db');
const felhasznalok = require('./felhasznalok');
const velemenyek = require('./velemenyek');
const perfumes = require('./perfumes');
const kosar = require('./kosar');

module.exports = {
    sequelize,
    felhasznalok,
    velemenyek,
    perfumes

};
