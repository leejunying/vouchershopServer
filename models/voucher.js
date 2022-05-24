const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      require: true,
    },
    img_url: {
      type: String,
    },
    categorys: [{ type: Schema.Types.ObjectId, ref: "categorys" }],
    stock: {
      type: Number,
      default: 0,
    },
    price_options: {
      type: Object,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vouchers", Voucherchema);
