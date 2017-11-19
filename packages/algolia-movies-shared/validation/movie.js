var validateModel = require("./index").validateModel;
const movieSchema = require("./movie.schema.json");

module.exports = function(movie) {
  return validateModel(movieSchema, movie);
};
