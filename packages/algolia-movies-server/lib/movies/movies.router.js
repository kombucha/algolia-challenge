const express = require("express");
const multer = require("multer");
const movieModel = require("./movies.model");
const { asyncWrapper } = require("../utils");

const uploads = multer({
  dest: process.env.UPLOADS_PATH,
  limits: { fileSize: 2000000, files: 1 },
});

const moviesRouter = express.Router();

moviesRouter.post(
  "/",
  uploads.single("image"),
  asyncWrapper(async (req, res) => {
    const movie = JSON.parse(req.body.movie);
    movie.image = `/uploads/${req.file.filename}`;

    const createdMovie = await movieModel.create(movie);
    res.send(createdMovie.objectID);
  })
);

moviesRouter.delete(
  "/:movieId",
  asyncWrapper(async (req, res) => {
    const { movieId } = req.params;

    await movieModel.remove(movieId);

    res.send(movieId);
  })
);

module.exports = moviesRouter;
