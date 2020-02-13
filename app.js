const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const router = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
      _id: '5e3e857d4c56fa8d080ff590'
  };

  next();
});

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
