const router = require('express').Router();

const cards = require('./cards');
const users = require('./users');

router.use(cards);
router.use(users);

module.exports = router;
