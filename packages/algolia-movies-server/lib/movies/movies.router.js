const express = require("express");

const moviesRouter = express.Router();

moviesRouter.post("/", (req, res) => {
  res.json({});
});
moviesRouter.delete("/:id", (req, res) => {
  res.json({});
});

module.exports = moviesRouter;
