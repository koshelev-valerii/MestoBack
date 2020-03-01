const router = require('express').Router();

const cards = require('../controllers/cards');

router.use(cards);

module.exports = router;
