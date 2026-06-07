require("dotenv").config();
require("express-async-errors");
const express = require("express");

// Extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// ConnectDB
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Middleware
const authenticatUser = require("./middleware/authentication");

const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set('trust-proxy', 1)
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  message: "Too many request please try again later",

}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(cors())
app.use(xxs())


// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticatUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/practice');
    console.log("Connection established");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
