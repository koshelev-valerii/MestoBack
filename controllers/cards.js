const { NotFoundError, ForbiddenError } = require('../errors');
const Cards = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Cards.create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const user = req.user._id;

  Cards.findById(req.params.id)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      } return cards;
    })
    .then((cards) => {
      if (!(cards.owner == user)) {
        throw new ForbiddenError('Вы пытаетесь удалить не свою карточку!');
      }

      Cards.findByIdAndRemove(req.params.id)
        .then((card) => {
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch(next);
};
