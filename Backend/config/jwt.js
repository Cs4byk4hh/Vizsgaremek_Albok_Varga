require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY || 'TartalekKulcs';

module.exports = SECRET_KEY;