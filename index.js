const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const voucherHunter = require("./routes");
const paymentController = require("./controllers/paymentController");

const app = express();
const server = require("http").Server(app);

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
});

dotenv.config();

var corsOptions = {
  //https://vouchershop-client.vercel.app
  // "http://localhost:3000"
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  exposedHeaders: "Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());
// endponit

//Payment socket

const countPayment = async () => {
  let data = {
    pending: 0,
    success: 0,
  };
  let countsuccess = await paymentController.countSuccessToDay();
  let countpending = await paymentController.countPending();

  data.pending = countpending;
  data.success = countsuccess;
  return data;
};

io.on("connection", async (socket) => {
  socket.on("payment", async (newpayment) => {
    let data = await countPayment();

    console.log(data);
    io.emit("newpayment", data);
    socket.emit("newpayment", data);
  });
});

app.use("/", voucherHunter);

//Mongoose Connection
mongoose
  .connect(process.env.DATABASE_CONNECT, {})
  .then(() => {
    console.log("Successfully connected to the database  DigiLink");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

server.listen(process.env.PORT, () => {
  console.log(`Server now running on port ${process.env.PORT}`);
});

module.exports = server;
