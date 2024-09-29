const Billing = require("../models/billing");
const Product = require("../models/product");
const soldStock = require("./soldStock");

// Add Billing
const addBilling = async (req, res) => {
    
  try {
    const newBilling = new Billing({
      userID: req.body.userID,
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      items: req.body.items,
      date: req.body.date,
      status: req.body.status,
      discountPercentage: req.body.discountPercentage,
      taxPercentage: req.body.taxPercentage,
      totalAmount: req.body.totalAmount,
      priceAfterDiscount: req.body.priceAfterDiscount,
      finalPrice: req.body.finalPrice,
      invID: req.body.invID,
    });

    const result = await newBilling.save().then( (result)=>{
        for (let item of req.body.items) {
            soldStock(item.product,item.quantity)
          }
          res.status(200).json(result.toJSON());
    });
    
    // Update product stock
    // for (let item of req.body.items) {
    //   await Product.findByIdAndUpdate(
    //     item.product,
    //     { $inc: { stock: -item.quantity } }
    //   );
    // }

    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Billing Data
const getBillingData = async (req, res) => {
  try {
    const billingData = await Billing.find({ userID: req.params.userID })
      .sort({ _id: -1 })
      .populate("items.product");
    res.status(200).json(billingData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Total Billing Amount
const getTotalBillingAmount = async (req, res) => {
  try {
    const billingData = await Billing.find({ userID: req.params.userID });
    const totalBillingAmount = billingData.reduce((total, bill) => total + parseFloat(bill.finalPrice), 0);
    res.status(200).json({ totalBillingAmount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Monthly Billing
const getMonthlyBilling = async (req, res) => {
  try {
    const billingData = await Billing.find({ userID: req.params.userID });

    const monthlyBilling = new Array(12).fill(0);

    billingData.forEach((bill) => {
      const monthIndex = bill.date.getMonth();
      monthlyBilling[monthIndex] += parseFloat(bill.finalPrice);
    });

    res.status(200).json({ monthlyBilling });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBilling, getBillingData, getTotalBillingAmount, getMonthlyBilling };
