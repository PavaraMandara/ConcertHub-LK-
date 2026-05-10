// controllers/eventController.js
// Full CRUD for events plus helpers to assign artists/suppliers.

const Event = require('../models/Event');

// ── GET /api/events ───────────────────────────────────────────────────────────
// Returns all events, populating artist and supplier details.
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('artists',   'name genre fee')
      .populate('suppliers', 'name serviceType cost')
      .populate('createdBy', 'name email')
      .sort({ date: 1 }); // Soonest events first

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/events/:id ───────────────────────────────────────────────────────
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('artists',   'name genre fee contactInfo')
      .populate('suppliers', 'name serviceType cost contactInfo')
      .populate('createdBy', 'name email');

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/events ──────────────────────────────────────────────────────────
const createEvent = async (req, res) => {
  const { title, date, location, budget } = req.body;

  try {
    const event = await Event.create({
      title,
      date,
      location,
      budget,
      createdBy: req.user._id, // set from JWT via authMiddleware
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── PUT /api/events/:id ───────────────────────────────────────────────────────
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Only the creator can update
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to update this event' });
    }

    const { title, date, location, budget } = req.body;
    event.title    = title    ?? event.title;
    event.date     = date     ?? event.date;
    event.location = location ?? event.location;
    event.budget   = budget   ?? event.budget;

    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── DELETE /api/events/:id ────────────────────────────────────────────────────
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/events/:id/artists ──────────────────────────────────────────────
// Assigns an artist to an event (avoids duplicates).
const assignArtist = async (req, res) => {
  const { artistId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.artists.includes(artistId)) {
      return res.status(400).json({ message: 'Artist already assigned to this event' });
    }

    event.artists.push(artistId);
    await event.save();

    const updated = await Event.findById(event._id)
      .populate('artists',   'name genre fee')
      .populate('suppliers', 'name serviceType cost');

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── POST /api/events/:id/suppliers ────────────────────────────────────────────
// Assigns a supplier to an event (avoids duplicates).
const assignSupplier = async (req, res) => {
  const { supplierId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.suppliers.includes(supplierId)) {
      return res.status(400).json({ message: 'Supplier already assigned to this event' });
    }

    event.suppliers.push(supplierId);
    await event.save();

    const updated = await Event.findById(event._id)
      .populate('artists',   'name genre fee')
      .populate('suppliers', 'name serviceType cost');

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, assignArtist, assignSupplier };
