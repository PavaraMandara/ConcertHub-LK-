// middleware/authMiddleware.js
// Protects routes by verifying the JWT token sent in the Authorization header.
//
// Usage: add `protect` as middleware to any route that requires authentication.
//   router.get('/protected', protect, controller.method)
//
// The decoded user id is attached to req.user so controllers can use it.

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Tokens are sent as:  Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorised – no token provided' });
  }

  try {
    // Verify signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user document (without password) to the request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorised – user not found' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorised – token invalid or expired' });
  }
};

module.exports = { protect };
