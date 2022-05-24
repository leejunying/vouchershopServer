const categorys = require("../models/categorys");

const categorysController = {
  newCategory: async (req, res) => {
    try {
      let newCategory = req.body;

      console.log("new", this.newCategory);

      const category = await categorys.create(newCategory);

      console.log(category);
      return res.status(200).json({ msg: "Add new succes", data: newCategory });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = req.body;
      const foundCategory = await category.findByIdAndUpdate(id, category);
      return res.status(200).json({ success: true, foundCategory });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await categorys.findByIdAndDelete(id);
      return res.status(200).json("Category deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getCategory: async (req, res) => {
    try {
      const voucher = await categorys.find();
      res.status(200).json(voucher);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Demo top 4 item  any category

  // date between  date
};
module.exports = categorysController;
