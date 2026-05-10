// routes/eventRoutes.js
// Read operations are public; write operations require authentication.

const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  assignArtist,
  assignSupplier,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getEvents)            // Public: list all events
  .post(protect, createEvent); // Protected: create event

router.route('/:id')
  .get(getEventById)             // Public: single event details
  .put(protect, updateEvent)     // Protected: update
  .delete(protect, deleteEvent); // Protected: delete

// Assign relationships
router.post('/:id/artists',   protect, assignArtist);
router.post('/:id/suppliers', protect, assignSupplier);

module.exports = router;
