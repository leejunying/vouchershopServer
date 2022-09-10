const Post = require("../models/post");

const postController = {
  getAllPost: async (req, res) => {
    try {
      const page = req.query.page;

      let count = 0;
      let perpage = 10;
      let total = 0;
      let Page = page * 1 || 0;

      count = await Post.find().countDocuments();
      total = Math.ceil(count / perpage);

      const posts = await Post.find()
        .populate("categoryid")
        .skip(perpage * Page - perpage)
        .limit(perpage)
        .sort({ createdAt: -1 });

      // console.log(posts);

      return res.status(200).json({ posts: posts, totalPage: total });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPostbyID: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(req.query);
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
      // console.log(foundPost);
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
  getTopPost: async (req, res) => {
    try {
      const posts = await Post.find();
      // const posts = await Post.find().sort({ createdAt: -1 }).limit(4);
      console.log(posts);
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = postController;
