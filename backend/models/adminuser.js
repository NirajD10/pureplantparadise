const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hashedpassword: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
    enum: [true, false],
  },
});

module.exports = mongoose.model("admins", adminUserSchema);
