const router = require('express').Router();
const controller = require('../controllers/velemeny.controller');

router.post('/', controller.createVelemeny);
router.delete('/:id', controller.deleteVelemeny);
router.put('/:id', controller.updateVelemeny);
router.get('/', controller.allvelemenyek);

module.exports = router;