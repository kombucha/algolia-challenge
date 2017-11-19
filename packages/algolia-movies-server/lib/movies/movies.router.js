const express = require("express");
const multer = require("multer");
const movieModel = require("./movies.model");
const logger = require("../logger");

const uploads = multer({
  dest: process.env.UPLOADS_PATH,
  limits: { fileSize: 2000000, files: 1 },
});

const moviesRouter = express.Router();

moviesRouter.post("/", uploads.single("image"), async (req, res) => {
  const movie = JSON.parse(req.body.movie);
  const imageUrl = `/uploads/${req.file.filename}`;
  movie.image = imageUrl;

  try {
    const createdMovie = await movieModel.create(movie);

    logger.info(`Movie created (${createdMovie.objectID})`);

    res.send(createdMovie.objectID);
  } catch (e) {
    logger.error(e);
    logger.error(e.stack);
    res.sendStatus(500);
  }
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
