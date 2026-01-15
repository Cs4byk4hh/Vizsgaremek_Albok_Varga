const router = require('express').Router();
const controller = require('../controllers/velemeny.controller');
const {authenticationtoken} = require('../middlewares/auth.middleware')

router.post('/', authenticationtoken, controller.createVelemeny);
router.delete('/:id', authenticationtoken, controller.deleteVelemeny);
router.put('/:id', authenticationtoken, controller.updateVelemeny);
router.get('/', authenticationtoken, controller.allvelemenyek);

module.exports = router;