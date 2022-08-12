const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new mongoose.Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "users", require: true },
    purchase_items: {
      type: Array,
    },

    total: {
      type: Number,
      required: true,
    },
    shipaddress: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      require: true,
    },
    contactphone: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("payments", PaymentSchema);
