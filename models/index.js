const Card = require('./card');
const User = require('./user');

module.exports = (app) => {
  app.set('models', { Card, User });

  return app;
};
