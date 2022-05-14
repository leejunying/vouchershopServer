const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categoryschema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    key: {
      type: String,
      required: true,
    },
    vouchers: [{ type: Schema.Types.ObjectId, ref: "vouchers" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("categorys", Categoryschema);
