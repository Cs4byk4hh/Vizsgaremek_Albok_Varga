const sequelize = require('../config/db');
const felhasznalok = require('./felhasznalok');
const velemenyek = require('./velemenyek');
const perfumes = require('./perfumes');
const kosar = require('./kosar');
const kosar_tartalom = require('./kosar_tartalom);

module.exports = {
    sequelize,
    felhasznalok,
    velemenyek,
    perfumes,
    kosar,
    kosar_tartalom
};




