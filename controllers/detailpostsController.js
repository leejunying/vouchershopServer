const Detailposts = require("../models/detailposts");

const detailpostController = {
  create: async (req, res) => {
    try {
      let newPost = req.body;
      const post = await Detailposts.create(newPost);
      return res.status(200).json({ msg: "Add new succes" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const { detailpostobj } = req.body;
      const foundandupdate = await Detailposts.findByIdAndUpdate(
        detailpostobj._id,
        detailpostobj,
      );
      return res.status(200).json({ success: true, foundandupdate });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { detailpostid } = req.body;
      await Detailposts.findByIdAndDelete(detailpostid);
      return res.status(200).json("post  deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getByVoucherid: async (req, res) => {
    try {
      const { voucherid } = req.query;
      console.log(voucherid);

      const data = await Detailposts.find({ voucherid: voucherid });
      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = detailpostController;
