const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    order_number: { type: Number, unique: true },
    customerid: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    email: {
      type: String,
    },
    contact: { type: String, required: true },
    paymentid: { type: Schema.Types.ObjectId, ref: "payments" },
    status: { type: String, required: true, default: "Pending" },
    amount: { type: Number, required: true },
    items: [
      {
        productid: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        quantity: { type: Number, required: true },
      },
    ],
    customernote: { type: String },
    shippingcost: { type: String, required: true },
    tax: { type: String, required: true },
    shipping_address: {
      full_name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true },
    },
    billing_address: {
      full_name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true },
    },
    carrier: {
      carriername: { type: String },
      trackingid: { type: String },
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

orderSchema.statics.getNextOrderId = async function () {
  const order = await this.findOne().sort({ order_number: -1 });
  const nextordernumber = order ? order.order_number + 1 : 1000;
  return nextordernumber;
};

orderSchema.pre("save", async function (next) {
  if (!this.order_number) {
    this.order_number = await this.constructor.getNextOrderId();
  }
  next();
});

module.exports = mongoose.model("orders", orderSchema);
