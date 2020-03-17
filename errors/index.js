const BadRequestError = require('./400');
const UnauthorizedError = require('./401');
const ForbiddenError = require('./403');
const NotFoundError = require('./404');

module.exports.BadRequestError = BadRequestError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NotFoundError = NotFoundError;
