const Post = require("../models/post");

const postController = {
  getAllPost: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("categoryid")
        .sort({ createdAt: -1 });

      return res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPostbyID: async (req, res) => {
    try {
      const { id } = req.query;
      const post = await Post.findById(id);
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const newPost = req.body;
      const post = await Post.create(newPost);
      return res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const post = req.body;
      const foundPost = await Post.findByIdAndUpdate(post._id, post);
      console.log(foundPost);
      return res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.body;

      await Post.findOneAndDelete(id);
      return res.status(200).json("Post delete");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = postController;
