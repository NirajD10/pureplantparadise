const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Product } = require("./product");

const customersSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedpassword: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
    phone_number: {
      type: Number,
      min: [10, "Phone Number must be 10 digit."],
    },
    billing_address: [
      {
        address: {type: String},
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String },
      },
    ],
    shipping_address: [
      {
        address: {type: String},
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String },
      },
    ],
    cart: {
      items: [
        {
          productid: { type: Schema.Types.ObjectId, ref: "product" },
          quantity: { type: Number },
        },
      ],
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  },
  { timestamps: true }
);

customersSchema.statics.fetchandUpdateCart = function () {
  const productIds = this.cart.items?.map((i) => i.productid);
  Product.find({ _id: { $in: productIds } })
    .then((product) => {
      // console.log(product);
      /* clear db cart items if products doesn't exists */
      if (product.length < productIds.length) {
        // console.log("conditions meet");
        const updateCart = {
          items: product.map((p) => {
            return this.cart.items.find(
              (item) => item.productid.toString() === p._id.toString()
            );
          }),
        };
        this.cart = updateCart;
        return this.save();
      }
    })
    .catch((err) => console.log(err));
};

module.exports = mongoose.model("customers", customersSchema);
