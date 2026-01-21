const router = require('express').Router();
const controller = require('../controllers/kosar.controller');
const {authenticationtoken} = require('../middlewares/auth.middleware');

router.post('/add', authenticationtoken, controller.addtoCart);
router.get('/get', authenticationtoken, controller.getCart);
router.delete('/:parfumId', authenticationtoken, controller.deleteCart)

module.exports = router;