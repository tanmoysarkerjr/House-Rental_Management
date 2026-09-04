// routes/admin.js - Admin Routes
const express = require('express');
const router = express.Router();
const {
  getAdminDashboard,
  getPendingManagers,
  approveManager,
  rejectManager,
  getAllManagers,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getAllProperties,
  getAllUsers,
  deleteUser,
  getAllBookings,
  updateUserRole,
  deleteProperty
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

// All routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getAdminDashboard);

// Manager Management
router.get('/managers', getAllManagers);
router.get('/managers/pending', getPendingManagers);
router.put('/managers/:id/approve', approveManager);
router.put('/managers/:id/reject', rejectManager);

// Property Management
router.get('/properties', getAllProperties);
router.get('/properties/pending', getPendingProperties);
router.put('/properties/:id/approve', approveProperty);
router.put('/properties/:id/reject', rejectProperty);
router.delete('/properties/:id', deleteProperty);

// User Management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// Booking Management
router.get('/bookings', getAllBookings);

module.exports = router;
