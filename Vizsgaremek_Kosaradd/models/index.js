const sequelize = require('../config/db');
const felhasznalok = require('./felhasznalok');
const velemenyek = require('./velemenyek');
const perfumes = require('./perfumes');
const kosar = require('./kosar');
const kosar_tartalom = require('./kosar_tartalom);

kosar_tartalom.belongsTo(kosar, { foreignKey: 'kosar_id' });
kosar_tartalom.belongsTo(perfumes, { foreignKey: 'parfum_id' });
velemenyek.belongsTo(felhasznalok, { foreignKey: 'user_id' });

module.exports = {
    sequelize,
    felhasznalok,
    velemenyek,
    perfumes,
    kosar,
    kosar_tartalom
};





