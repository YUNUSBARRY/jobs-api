// ===============================
// Environment & Dependencies
// ===============================
require("dotenv").config();
require("express-async-errors");
const express = require("express");

// ===============================
// Security Middleware
// ===============================
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// ===============================
// Database Connection
// ===============================
const connectDB = require("./db/connect");

// ===============================
// Routers
// ===============================
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// ===============================
// Authentication Middleware
// ===============================
const authenticatUser = require("./middleware/authentication");

const app = express();

// ===============================
// Error Middleware
// ===============================
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// ===============================
// Rate Limiting
// ===============================
app.set('trust-proxy', 1);
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 200,
    message: "Too many request please try again later",
  })
);


// ===============================
// Body Parsers & Security
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());


app.get("/", (req, res) => {
  res.send("API is running...");
});


// ===============================
// Routes
// ===============================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticatUser, jobsRouter);


// ===============================
// Error Handling
// ===============================
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// ===============================
// Server Startup
// ===============================
const port = process.env.PORT || 3500;

const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/practice"
    );
    console.log("Connection established");

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
