const express = require('express');

const router = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
