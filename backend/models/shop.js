const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopSchema = {
  tax: { type: String },
  shipping_policy: { type: String },
  delivery_message: { type: String },
  return_policy: { type: String },
  shipping_method: [
    { delivery_type: { type: String }, delivery_cost: { type: String } },
  ],
  banner_image: [{ type: String, required: true }],
};

module.exports = mongoose.model("shop", shopSchema);
