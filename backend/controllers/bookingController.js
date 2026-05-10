// controllers/bookingController.js
// Allows authenticated users to book events and cancel bookings.

const Booking = require('../models/Booking');

// ── GET /api/bookings ─────────────────────────────────────────────────────────
// Returns bookings belonging to the logged-in user.
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date location')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/bookings ────────────────────────────────────────────────────────
// Books an event for the logged-in user.
// The unique index on (user, event) prevents duplicate bookings at the DB level.
const createBooking = async (req, res) => {
  const { eventId } = req.body;

  try {
    const booking = await Booking.create({ user: req.user._id, event: eventId });
    await booking.populate('event', 'title date location');
    res.status(201).json(booking);
  } catch (err) {
    // Duplicate key error from unique index
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }
    res.status(400).json({ message: err.message });
  }
};

// ── DELETE /api/bookings/:id ──────────────────────────────────────────────────
// Cancels (deletes) a booking.  Users can only cancel their own bookings.
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to cancel this booking' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyBookings, createBooking, cancelBooking };
