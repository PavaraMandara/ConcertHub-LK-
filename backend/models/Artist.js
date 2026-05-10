// models/Artist.js
// Represents a musical artist available for booking at events.

const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
    },
    // Performance fee in Sri Lankan Rupees
    fee: {
      type: Number,
      required: [true, 'Fee is required'],
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

module.exports = mongoose.model('Artist', artistSchema);
