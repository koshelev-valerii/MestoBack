const { Joi, errors } = require('celebrate');
const joiObjectId = require('joi-objectid');
const router = require('express').Router();

const { NotFoundError } = require('../errors');

const users = require('./users');
const cards = require('./cards');

Joi.objectId = joiObjectId(Joi);

router.use('/cards', cards);
router.use('/users', users);
router.use('/', (_, res, next) => {
  next(new NotFoundError('The requested resource is not found'));
});

router.use(router.get('logger.error'));

router.use(errors());

module.exports = router;
