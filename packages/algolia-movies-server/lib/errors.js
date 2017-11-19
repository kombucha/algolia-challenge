const logger = require("./logger");

class CustomError extends Error {
  constructor(message, statusCode, metadata) {
    super(message);
    this.statusCode = statusCode || 500;
    this.metadata = metadata;
  }
}

// eslint-disable-next-line no-unused-vars
const expressErrorHandler = (err, req, res, next) => {
  logger.error(err);

  if (!err || !(err instanceof CustomError)) {
    res.status(500);
    res.json({ code: 500, message: "Unexpected error" });
  } else {
    res.status(err.statusCode);
    res.json({ message: err.message, metadata: err.metadata });
  }
};

module.exports = {
  CustomError,
  expressErrorHandler,
};
