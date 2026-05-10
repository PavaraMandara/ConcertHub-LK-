// routes/bookingRoutes.js
// All booking routes require authentication – users must be logged in.

const express = require('express');
const { getMyBookings, createBooking, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getMyBookings)    // Get logged-in user's bookings
  .post(protect, createBooking);  // Book an event

router.delete('/:id', protect, cancelBooking); // Cancel a booking

module.exports = router;
