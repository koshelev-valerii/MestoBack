const cards = require('./cards');
const users = require('./users');

module.exports = (app) => {
  app.set('controllers', {
    cards: cards(app),
    users: users(app),
  });

  return app;
};
