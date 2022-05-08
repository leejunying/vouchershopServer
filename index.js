const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const cookieParser = require("cookie-parser");

const voucherHunter = require("./routes");

const app = express();
dotenv.config();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  exposedHeaders: "Authorization",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// endponit
app.use("/", voucherHunter);

mongoose
  .connect(process.env.DATABASE_CONNECT, {})
  .then(() => {
    console.log("Successfully connected to the database  DigiLink");
    app.listen(process.env.PORT, () => {
      console.log(`Server now running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
