const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const test = require("./test/test");
const personsRouter = require("./controllers/person");
const logger = require("./utils/logger");
const config = require("./utils/config");

logger.info(`connecting to`, config.MONGODB_URI);
const url = config.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/info", test.info).get("/", test.hello);

app.use("/api/persons", personsRouter);

module.exports = app;
