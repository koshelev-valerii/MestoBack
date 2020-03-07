const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('express').Router();

const auth = require('./auth');
const { requestLogger, errorLogger } = require('./logger');

router.use(requestLogger);
router.use(cors());
router.use(helmet());
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(auth);
router.use(errorLogger);

module.exports = router;
