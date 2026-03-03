const router = require('express').Router();
const controller = require('../controllers/profile.controller');
const {authenticationtoken} = require('../middlewares/auth.middleware');

router.get('/getprofile', authenticationtoken, controller.getProfile);
router.put('/updateprofile', authenticationtoken, controller.updateProfile);

module.exports = router;