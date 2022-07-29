const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Detailpostschema = new mongoose.Schema(
  {
    voucherid: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("detailposts", Detailpostschema);
