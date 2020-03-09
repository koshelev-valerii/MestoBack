const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const { getCards, addCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), addCard);
router.delete('/cards/:id', deleteCard);

module.exports = router;
