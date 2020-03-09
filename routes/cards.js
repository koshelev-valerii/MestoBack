const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const { getCards, addCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', addCard);
router.delete('/cards/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), deleteCard);

module.exports = router;
