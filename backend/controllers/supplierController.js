// controllers/supplierController.js
// Full CRUD for suppliers.

const Supplier = require('../models/Supplier');

// ── GET /api/suppliers ────────────────────────────────────────────────────────
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/suppliers/:id ────────────────────────────────────────────────────
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/suppliers ───────────────────────────────────────────────────────
const createSupplier = async (req, res) => {
  const { name, serviceType, cost, contactInfo } = req.body;
  try {
    const supplier = await Supplier.create({ name, serviceType, cost, contactInfo });
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── PUT /api/suppliers/:id ────────────────────────────────────────────────────
const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── DELETE /api/suppliers/:id ─────────────────────────────────────────────────
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };
