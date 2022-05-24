const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    item: {
      type: Array,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bills", BillSchema);
