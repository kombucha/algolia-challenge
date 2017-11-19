const { validateModel } = require("./index");
const movieSchema = require("./movie.schema.json");

module.exports = movie => validateModel(movieSchema, movie);
