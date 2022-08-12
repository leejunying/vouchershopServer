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
      console.log(user);
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
      // const {_id,
      //   username,
      //   email,
      //   phone,
      //   password,
      //   firstname,
      //   lastname} = req.body
      const updateData = req.body;
      const updateUser = await User.findByIdAndUpdate(
        updateData._id,
        updateData,
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;

      await User.findByIdAndDelete(id);
      console.log(id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
