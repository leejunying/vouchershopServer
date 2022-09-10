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
      const page = req.query.page;

      let count = 0;
      let perpage = 10;
      let total = 0;
      let Page = page * 1 || 0;

      count = await User.find().countDocuments();
      total = Math.ceil(count / perpage);

      const users = await User.find()
        .find()
        .skip(perpage * Page - perpage)
        .limit(perpage)
        .sort({ createdAt: -1 });

      return res.status(200).json({ users: users, totalPage: total });
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

  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, id } = req.body;

      const data = await User.findById(id);

      if (data) {
        let checkpassword = await bcrypt.compare(oldPassword, data.password);
        if (checkpassword == true) {
          const update = await User.findByIdAndUpdate(id, {
            password: newPassword,
          });
          if (update) res.status(200).json("Update password successfully");
        } else res.status(401).json("Mật khẩu cũ không đúng");
      }
    } catch (err) {
      res.status(500).json("system error");
    }
  },
  updateUser: async (req, res) => {
    try {
      const updateData = req.body;
      const updateUser = await User.findByIdAndUpdate(
        updateData.id,
        updateData,
      );

      console.log(updateUser);
      res.status(200).json(updateUser);
    } catch (err) {
      let obj = {
        phone: "",
        email: "",
      };
      const errEmail = "Email available";

      const errPhone = "Phone number available";
      if (err.keyPattern.phone == 1) {
        obj.phone = errPhone;
      }
      if (err.keyPattern.email == 1) {
        obj.email = errEmail;
      }
      res.status(500).json(obj);
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
