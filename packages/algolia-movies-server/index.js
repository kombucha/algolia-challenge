const path = require("path");
const express = require("express");
const history = require("connect-history-api-fallback");

const logger = require("./lib/logger");
const { expressErrorHandler } = require("./lib/errors");
const db = require("./lib/db");
const apiRouter = require("./lib/api.router");

const app = express();

// Uploads
const uploadsPath = path.resolve(process.env.UPLOADS_PATH);
logger.info(uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// Static
const publicPath = path.resolve(process.env.PUBLIC_PATH);
app.use(express.static(publicPath));

// HTML5 history
app.use(history());

// Api
app.use("/api/1", apiRouter);

// Global error handler
app.use(expressErrorHandler);

// Start server
(async () => {
  const port = parseInt(process.env.PORT, 10);
  await db.get();
  await app.listen(port);
  logger.info(`Server started on port ${port}`);
})();
