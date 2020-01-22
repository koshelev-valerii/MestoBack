const router = require('express').Router();

const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((item) => item._id === id);
  if (user) {
    res.send(user);
    return;
  }

  res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = router;
