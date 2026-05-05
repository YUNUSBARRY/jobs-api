require("dotenv").config();
require("express-async-errors");
const express = require("express");

// ConnectDB
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Middleware
const authenticatUser = require('./middleware/authentication')

const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticatUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connection established");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

start();