// models/Supplier.js
// Represents a service supplier (sound, tent, lighting, etc.).

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    // Type of service the supplier provides
    serviceType: {
      type: String,
      enum: ['sound', 'tent', 'lighting', 'other'],
      required: [true, 'Service type is required'],
    },
    // Cost in Sri Lankan Rupees
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: 0,
    },
    contactInfo: {
      type: String,
      required: [true, 'Contact info is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', supplierSchema);
