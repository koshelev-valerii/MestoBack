const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');

router.use(users);
router.use(cards);

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
