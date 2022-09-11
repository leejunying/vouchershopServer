const Payment = require("../models/payment");
const User = require("../models/user");
const billController = {
  getAlll: async (req, res) => {
    try {
      const page = req.query.page;

      let count = 0;
      let perpage = 10;
      let total = 0;
      let Page = page * 1 || 0;

      count = await Payment.find().countDocuments();
      total = Math.ceil(count / perpage);

      const bills = await Payment.find()
        .populate("userid")
        .skip(perpage * Page - perpage)
        .limit(perpage)
        .sort({ createdAt: -1 });

      // console.log(bills);
      // console.log("This bill", bills);
      return res.status(200).json({ payments: bills, totalPage: total });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  countSuccessToDay: async () => {
    try {
      const sucess = await Payment.countDocuments({
        status: "success",
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      });

      return sucess;
    } catch (err) {
      return err;
    }
  },

  countPending: async () => {
    try {
      const pendingpayment = await Payment.countDocuments({
        status: "pending",
      });

      return pendingpayment;
    } catch (err) {
      return err;
    }
  },

  countPayMent: async (req, res) => {
    try {
      let data = {
        success: 0,
        pending: 0,
      };
      const sucess = await Payment.countDocuments({
        status: "success",
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      });
      const pending = await Payment.countDocuments({
        status: "pending",
      });
      data.pending = pending;
      data.sucess = sucess;

      console.log(data);
      return res.status(200).json(data);
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
      // console.log("body", data);

      const newpayment = await Payment.create(data);

      if (newpayment) {
        const updateUser = await User.findByIdAndUpdate(data.userid, {
          $push: { paymentid: newpayment._id },
        });
        return res.status(200).json("transaction complete");
      }
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
      await Payment.findByIdAndUpdate(id, { status: "Delete" });
      return res.status(200).json("Bill delete");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = billController;
