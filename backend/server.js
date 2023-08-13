// Nodemon---> It monitors your project directory and automatically restarts your node application when it detects any changes. This means that you do not have to stop and restart your applications in order for your changes to take effect.
//backend framework to build RESTFUL api's
const path = require("path");
const express = require("express");

// acts as a global variable for our ports, database url
require("dotenv").config();

// allows you to have a colors in the console
const colors = require("colors");

// Morgan is a logging tool (middleware) that can be used in HTTP servers implemented using Express & Node. js. It can be used to log requests, errors, and more to the console.
const morgan = require("morgan");
const connectDB = require("./config/db");
connectDB();
const PORT = process.env.PORT || 5000;

const transactions = require("./routes/transactions");
const app = express();
app.use(express.json());
// app.get("/", async (req, res) => {
//   res.send("Hello");
// });
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
