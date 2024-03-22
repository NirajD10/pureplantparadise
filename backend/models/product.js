const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldprice: { type: Number },
    categories: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "categories",
      },
    ],
    attributes: [
      {
        value: {
          type: Schema.Types.ObjectId,
          ref: "attributes",
        },
        label: {
          type: String,
        },
      },
    ],
    ratingstar: {
      type: Number,
      required: true,
      default: 0,
    },
    featuredimageUrl: {
      type: String,
      required: true,
    },
    tag: { type: String },
    productdetails: {
      type: Schema.Types.ObjectId,
      ref: "product_details",
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

const product_detailsSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  mediaurl: [{ type: String, required: true }],
  status: {
    type: String,
    required: true,
    enum: ["enabled", "disabled"],
  },
  mangestock: {
    type: String,
    required: true,
    enum: ["yes", "no"],
  },
  quantity: { type: Number },
  stock_availability: {
    type: String,
    enum: ["yes", "no"],
  },
  // variant: [
  //   {
  //     title: { type: String, required: true },
  //     price: { type: String, required: true },
  //     quantity: { type: Number },
  //     sku: { type: String, required: true },
  //     size: { type: String },
  //     color: { type: String },
  //   },
  // ],
});

const product_details = mongoose.model(
  "product_details",
  product_detailsSchema
);

module.exports = {
  Product: product,
  ProductDetails: product_details,
};
