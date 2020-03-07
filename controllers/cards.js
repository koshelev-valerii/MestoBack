const router = require('express').Router();
const { NotFoundError } = require('../errors');
const Cards = require('../models/card');

router.get('/cards', (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
});

router.post('/cards', (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Cards.create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
});

router.delete('/cards/:id', (req, res, next) => {
  const user = req.user._id;

  Cards.findById(req.params.id)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      } else if (cards.owner == user) {
        Cards.findByIdAndRemove(req.params.id)
          .then((card) => {
            res.send({ data: card });
          })
          .catch(next);
      }
    })
    .catch(next);
});

module.exports = router;
