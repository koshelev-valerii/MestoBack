require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
// const controllers = require('./controllers');
// const models = require('./models');
const routes = require('./routes');
// const errors = require('./errors');

const { PORT = 3000 } = process.env;
const app = express();

// const app = [

//   (testApp) => {
//     testApp.get('/crash-test', () => {
//       setTimeout(() => {
//         throw new Error('Server will crash now');
//       }, 0);
//     });

//     return testApp;
//   },
//   dotenv,
//   models,
//   controllers,
//   middlewares,
//   routes,
//   errors,
// ].reduce(() => express());

app.use(express.static(`${__dirname}/public`));
app.use(middlewares);
app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
