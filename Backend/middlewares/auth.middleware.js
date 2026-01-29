const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/jwt');

const tokenBlackList = new Set();

const authenticationtoken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || tokenBlackList.has(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticationtoken,
    tokenBlackList
}