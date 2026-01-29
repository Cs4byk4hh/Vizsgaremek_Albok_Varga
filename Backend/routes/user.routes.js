const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { authenticationtoken } = require('../middlewares/auth.middleware');

router.delete('/user/:id', authenticationtoken, controller.deleteUser);
router.get('/user', authenticationtoken, controller.getUser);

module.exports = router;