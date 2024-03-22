const mongoose = require("mongoose");
const { Schema } = mongoose;

const attributeSchema = new Schema({
  name: { type: String, required: true },
  attribute_code: { type: String, required: true, unique: true },
  attribute_options: [{ value: { type: String, required: true, unique: true } }],
  attribute_group: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  display_customer: { type: String, required: true, enum: ["yes", "no"] },
});

module.exports = mongoose.model("attributes", attributeSchema);
