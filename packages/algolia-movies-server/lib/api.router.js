const express = require("express");
const moviesRouter = require("./movies/movies.router");

const apiRouter = express.Router();

apiRouter.use("/movies", moviesRouter);

module.exports = apiRouter;
