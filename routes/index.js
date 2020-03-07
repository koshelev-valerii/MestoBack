const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');
const router = require('express').Router();

const { NotFoundError } = require('../errors');

const users = require('./users');
const cards = require('./cards');

Joi.objectId = joiObjectId(Joi);

router.use(users);
router.use(cards);
router.all('*', () => new NotFoundError('The requested resource is not found'));

module.exports = router;
