const router = require('express').Router();

const Cards = require('../models/card');

router.get('/cards', (req, res) => {
  Cards.find({})
      .then(cards => res.send({ data: cards }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

router.post('/cards', (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Cards.create({ name, link, owner })
      .then(cards => res.send({ data: cards }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

router.delete('/cards/:id', (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
      .then(cards => res.send({ data: cards }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка : ${err}` }));
});

module.exports = router;
