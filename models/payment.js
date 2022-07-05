const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    purchase_items: {
      type: Array,
    },

    total: {
      type: Number,
      required: true,
    },
    ship: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("payments", PaymentSchema);
