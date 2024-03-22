const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: { type: String, required: true },
  categoriesid: { type: String, unique: true },
  description: { type: String },
  category_bannerurl: { type: String, required: true },
  thumbnail_imageurl: { type: String, required: true },
  status: { type: String, required: true, enum: ["enabled", "disabled"] },
  ismenuinclude: { type: String, required: true, enum: ["yes", "no"] },
});

categorySchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model("categories", categorySchema);
