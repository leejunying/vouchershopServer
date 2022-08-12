const Payment = require("../models/payment");

const billController = {
  getAlll: async (req, res) => {
    try {
      const bills = await Payment.find()
        .populate("userid")
        .sort({ createdAt: -1 });

      console.log("This bill", bills);
      return res.status(200).json(bills);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getByID: async (req, res) => {
    try {
      const { id } = req.query;
      const payment = await Payment.findById(id);
      return res.status(200).json(payment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  createOne: async (req, res) => {
    try {
      const data = req.body;
      console.log("body", data);

      const newpayment = await Payment.create(data);
      return res.status(200).json(newpayment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const bill = req.body;
      await Payment.findByIdAndUpdate(bill._id, bill);
      return res.status(200).json("Bill delete");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.body;
      await Payment.findByIdAndDelete(id);
      return res.status(200).json("Bill delete");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = billController;
