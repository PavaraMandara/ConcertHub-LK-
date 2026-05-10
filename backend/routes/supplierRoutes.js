// routes/supplierRoutes.js

const express = require('express');
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getSuppliers)              // Public
  .post(protect, createSupplier); // Protected

router.route('/:id')
  .get(getSupplierById)              // Public
  .put(protect, updateSupplier)      // Protected
  .delete(protect, deleteSupplier);  // Protected

module.exports = router;
