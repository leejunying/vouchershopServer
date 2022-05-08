const mongoose = require("mongoose");

const Voucherchema = new mongoose.Schema(
  {
    key: {
      type: String,
      require: true,
    },

    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    discount: {
      typeof: Number,
      default: 0,
    },
    status: {
      type: String,
      require: true,
    },
    img_url: {
      type: String,
    },
    category: {
      type: Array,
    },
    stock: {
      type: Number,
      default: 0,
    },
    price_options: {
      type: Array,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vouchers", Voucherchema);
