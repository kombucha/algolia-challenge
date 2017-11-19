/**
 * Wraps an async route handler.
 * Forwards the error to next when necessary. This way, we can handle all errors
 * in one place
 * @param {function} [routeHandler] An express route handler
 * @returns {function}
 */
const asyncWrapper = routeHandler => (req, res, next) => {
  Promise.resolve(routeHandler(req, res, next)).catch(next);
};

module.exports = { asyncWrapper };
