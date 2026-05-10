// controllers/artistController.js
// Full CRUD for artists.

const Artist = require('../models/Artist');

// ── GET /api/artists ──────────────────────────────────────────────────────────
const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ name: 1 });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/artists/:id ──────────────────────────────────────────────────────
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/artists ─────────────────────────────────────────────────────────
const createArtist = async (req, res) => {
  const { name, genre, fee, contactInfo } = req.body;
  try {
    const artist = await Artist.create({ name, genre, fee, contactInfo });
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── PUT /api/artists/:id ──────────────────────────────────────────────────────
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── DELETE /api/artists/:id ───────────────────────────────────────────────────
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getArtists, getArtistById, createArtist, updateArtist, deleteArtist };
