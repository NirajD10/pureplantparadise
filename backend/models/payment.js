const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = {
  customerid: { type: Schema.Types.ObjectId, ref: "customers" },
  order_email: { type: String, ref: "orders" },
  status: { type: String, required: true, default: "Pending" },
  gateway: { type: String },
  type: { type: String, required: true },
  amount: { type: String, required: true },
  cod_id: { type: String },
  razorpay_orderid: { type: String },
  razorpay_payment: {
    payment_id: { type: String },
    order_id: { type: String },
    signature: { type: String },
  },
};

module.exports = mongoose.model("payments", paymentSchema);
