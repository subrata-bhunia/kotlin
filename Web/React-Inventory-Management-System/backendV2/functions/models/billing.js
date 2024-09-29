const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    priceAfterDiscount: {
      type: String,
      required: true,
    },
    finalPrice: {
      type: String,
      required: true,
    },
    invID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Billing = mongoose.model("billing", BillingSchema);
module.exports = Billing;

