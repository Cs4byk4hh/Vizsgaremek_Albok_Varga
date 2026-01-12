const router = require('express').Router();
const controller = require('../controllers/kosar.controller');
const {authenticationtoken} = require('../middlewares/auth.middleware');

router.post('/add', authenticationtoken, controller.addtoCart);
router.get('/get', authenticationtoken, controller.getCart);

module.exports = router;