const express = require("express");
const movieModel = require("./movies.model");
const logger = require("../logger");

const moviesRouter = express.Router();

moviesRouter.post("/", (req, res) => {
  res.json({});
});

moviesRouter.delete("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    await movieModel.remove(movieId);
    res.send(movieId);
  } catch (e) {
    logger.error(e);
    logger.error(e.stack);
    res.sendStatus(500);
  }
});

module.exports = moviesRouter;
