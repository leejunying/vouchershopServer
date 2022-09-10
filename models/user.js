const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      min: 6,
      max: 20,
    },
    firstname: {
      type: String,
      require: true,
      min: 2,
      max: 20,
    },
    lastname: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      require: true,
      max: 12,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    paymentid: [{ type: Schema.Types.ObjectId, ref: "payments" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("users", userSchema);
