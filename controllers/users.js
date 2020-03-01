const router = require('express').Router();

const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: users });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

module.exports = router;
