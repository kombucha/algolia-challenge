const path = require("path");
const express = require("express");
const history = require("connect-history-api-fallback");

const logger = require("./lib/logger");
const apiRouter = require("./lib/api.router");

const app = express();

// Static
const publicPath = path.resolve(process.env.PUBLIC_PATH);
app.use(express.static(publicPath));
app.use(history());

// Api
app.use("/api/1", apiRouter);

const port = parseInt(process.env.PORT, 10);
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
