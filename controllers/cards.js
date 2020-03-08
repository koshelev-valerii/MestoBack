const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const { NotFoundError, ForbiddenError } = require('../errors');
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

router.delete('/cards/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), (req, res, next) => {
  const user = req.user._id;

  Cards.findById(req.params.id)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      } return cards;
    })
    .then((cards) => {
      if (cards.owner !== user) {
        throw new ForbiddenError('Вы пытаетесь удалить не свою карточку!');
      }

      Cards.findByIdAndRemove(req.params.id)
        .then((card) => {
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
