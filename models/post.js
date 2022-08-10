const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      require: true,
    },

    categoryid: { type: Schema.Types.ObjectId, ref: "categorys" },
    img_url: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      reuqire: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("posts", postSchema);
