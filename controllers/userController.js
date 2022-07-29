const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  newUser: async (req, res) => {
    try {
      const { username, phone, password, isAdmin, email } = req.value.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = {
        phone: phone,
        username: username,
        password: hashed,
        isAdmin: isAdmin,
        email: email,
      };
    } catch (err) {
      const errPhone = "Phone number available";

      const errEmail = "Email available";

      const errUsername = "Username available";

      let result = "";
      if (err.keyPattern.phone != undefined) result += errPhone;
      if (err.keyPattern.email != undefined) result += errEmail;
      if (err.keyPattern.username != undefined) result += errUsername;
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserbyID: async (req, res) => {
    try {
      const { id } = req.value.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.value.params;
      const { username, phone, avatar, address, isAdmin } = req.value.body;
      const beforeInfo = await User.findById(id);
      if (username !== beforeInfo.username) {
        const userName = await User.findOne({ username });
        if (userName) {
          return res
            .status(404)
            .json({ msg: "This username is already registered" });
        }
      }
      const newUser = {
        username,
        phone,
        avatar,
        address,
        isAdmin,
      };
      const foundUser = await User.findByIdAndUpdate(id, newUser);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.value.params;
      await User.findByIdAndDelete(id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
