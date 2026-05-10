// routes/artistRoutes.js

const express = require('express');
const {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
} = require('../controllers/artistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getArtists)              // Public
  .post(protect, createArtist); // Protected

router.route('/:id')
  .get(getArtistById)              // Public
  .put(protect, updateArtist)      // Protected
  .delete(protect, deleteArtist);  // Protected

module.exports = router;
