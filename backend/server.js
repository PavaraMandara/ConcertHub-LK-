// server.js
// Entry point for the ConcertHub LK backend.
// Loads environment variables, connects to MongoDB, registers all routes,
// and starts the Express server.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes     = require('./routes/authRoutes');
const eventRoutes    = require('./routes/eventRoutes');
const artistRoutes   = require('./routes/artistRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const bookingRoutes  = require('./routes/bookingRoutes');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());           // Allow requests from the React dev server
app.use(express.json());   // Parse incoming JSON bodies

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/events',    eventRoutes);
app.use('/api/artists',   artistRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/bookings',  bookingRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ message: 'ConcertHub LK API is running 🎵' }));

// ── Database + Server ─────────────────────────────────────────────────────────
const PORT     = process.env.PORT     || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/concerthub';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
