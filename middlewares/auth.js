const jwt = require('jsonwebtoken');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const router = require('express').Router();

const { UnauthorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().uri(),
  }),
}), createUser);
router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const { jwt: token } = req.cookies;

    if (!token) {
      throw new UnauthorizedError();
    }

    authorization = token;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
