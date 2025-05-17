const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String },
    privacyPolicyAccepted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
