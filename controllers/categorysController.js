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

  getCategoryID: async (req, res) => {
    try {
      const { key } = req.params;

      const category = await categorys.find({ key: key });

      console.log(category);

      return res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await categorys.find();
      return res.status(200).json(data);
    } catch (err) {
      return res.stat(500).json(err);
    }
  },

  getCategory: async (req, res) => {
    try {
      const page = req.query["page"];
      const categoryid = req.query["key"];

      const Categorys = await categorys
        .findOne({ key: categoryid })
        .populate("vouchers");

      let count = Categorys["vouchers"].length;

      let perpage = 8;

      let total = Math.ceil(count / perpage);

      let list = Categorys["vouchers"];

      list = list.slice((page - 1) * perpage, page * perpage);

      if (page > total) {
        return res.status(404).json({ msg: "Page not found" });
      } else {
        list.totalpage = total;
        return res.status(200).json(list);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Demo top 4 item  any category

  // date between  date
};
module.exports = categorysController;
