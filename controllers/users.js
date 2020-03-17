const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../errors');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      return res
        .set({
          authorization: `Bearer ${token}`,
        })
        .cookie('jwt', {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};


module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  return User.create({ email, password, name, about, avatar })
    .then((users) => {
      users.password = '********';
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      users.password = '********';
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь не найден');
      }
      users.password = '********';
      res.send({ data: users });
    })
    .catch(next);
};
