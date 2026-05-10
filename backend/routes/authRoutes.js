// routes/authRoutes.js
// Public routes – no authentication needed.

const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register  →  create account
router.post('/register', register);

// POST /api/auth/login     →  receive JWT
router.post('/login', login);

module.exports = router;
