const router = require('express').Router();
const controller = require('../controllers/perfume.controller');

router.get('/', controller.getperfumes);

module.exports = router;
