const Payment = require("../models/payment");

const billController = {
  getAlll: async (req, res) => {
    try {
      const bills = await Payment.find();
      return res.status(200).json(bills);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getByID: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      return res.status(200).json(payment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  createOne: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);

      const newpayment = await Payment.create(data);
      return res.status(200).json(newpayment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // deleteBill: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await Payment.findOneAndDelete(id);
  //     return res.status(200).json("Bill delete");
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // },
  // updatePost: async (req, res) =>{
  //     try{
  //         const {id}= req.params
  //         const
  //     }catch (err) {
  //         return res.status(500).json(err)
  //     }
  // }
};

module.exports = billController;
