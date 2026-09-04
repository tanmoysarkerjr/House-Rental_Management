// controllers/adminController.js - Admin Operations
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
exports.getAdminDashboard = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalManagers = await User.countDocuments({ role: 'manager' });
    const pendingManagers = await User.countDocuments({ role: 'manager', isVerified: false });
    const totalProperties = await Property.countDocuments();
    const pendingProperties = await Property.countDocuments({ verified: false });
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'active' });
    const totalReviews = await Review.countDocuments();

    // Get recent activities
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt');

    const recentProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('manager', 'name email')
      .select('title location price verified createdAt');

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .populate('property', 'title')
      .select('status pricing.totalAmount createdAt');

    // Revenue statistics
    const revenueStats = await Booking.aggregate([
      { $match: { 'payment.status': 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$pricing.totalAmount' },
          totalServiceFees: { $sum: '$pricing.serviceFee' }
        }
      }
    ]);

    const dashboardData = {
      stats: {
        totalUsers,
        totalManagers,
        pendingManagers,
        totalProperties,
        pendingProperties,
        totalBookings,
        activeBookings,
        totalReviews,
        totalRevenue: revenueStats[0]?.totalRevenue || 0,
        totalServiceFees: revenueStats[0]?.totalServiceFees || 0
      },
      recentActivities: {
        users: recentUsers,
        properties: recentProperties,
        bookings: recentBookings
      }
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all pending manager approvals
// @route   GET /api/admin/managers/pending
// @access  Private (Admin only)
exports.getPendingManagers = async (req, res) => {
  try {
    const pendingManagers = await User.find({
      role: 'manager',
      isVerified: false
    }).select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingManagers.length,
      data: pendingManagers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve manager
// @route   PUT /api/admin/managers/:id/approve
// @access  Private (Admin only)
exports.approveManager = async (req, res) => {
  try {
    const manager = await User.findById(req.params.id);

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager not found'
      });
    }

    if (manager.role !== 'manager') {
      return res.status(400).json({
        success: false,
        message: 'User is not a manager'
      });
    }

    manager.isVerified = true;
    await manager.save();

    // TODO: Send approval email to manager
    // await sendEmail({
    //   email: manager.email,
    //   subject: 'Manager Account Approved',
    //   message: 'Congratulations! Your manager account has been approved.'
    // });

    res.status(200).json({
      success: true,
      message: 'Manager approved successfully',
      data: manager
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject manager
// @route   PUT /api/admin/managers/:id/reject
// @access  Private (Admin only)
exports.rejectManager = async (req, res) => {
  try {
    const { reason } = req.body;
    const manager = await User.findById(req.params.id);

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager not found'
      });
    }

    // TODO: Send rejection email
    // await sendEmail({
    //   email: manager.email,
    //   subject: 'Manager Application Rejected',
    //   message: `Your manager application has been rejected. Reason: ${reason}`
    // });

    // Delete the manager account or just mark as rejected
    await manager.remove();

    res.status(200).json({
      success: true,
      message: 'Manager rejected and removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all managers
// @route   GET /api/admin/managers
// @access  Private (Admin only)
exports.getAllManagers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const query = { role: 'manager' };
    
    // Filter by verification status
    if (req.query.verified) {
      query.isVerified = req.query.verified === 'true';
    }

    const managers = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    // Get property count for each manager
    const managersWithStats = await Promise.all(
      managers.map(async (manager) => {
        const propertyCount = await Property.countDocuments({ 
          manager: manager._id 
        });
        const verifiedPropertyCount = await Property.countDocuments({ 
          manager: manager._id,
          verified: true
        });
        
        return {
          ...manager.toObject(),
          propertyCount,
          verifiedPropertyCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: managersWithStats.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: managersWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all pending property approvals
// @route   GET /api/admin/properties/pending
// @access  Private (Admin only)
exports.getPendingProperties = async (req, res) => {
  try {
    const pendingProperties = await Property.find({ verified: false })
      .populate('manager', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingProperties.length,
      data: pendingProperties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve property
// @route   PUT /api/admin/properties/:id/approve
// @access  Private (Admin only)
exports.approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('manager', 'name email');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    property.verified = true;
    await property.save();

    // TODO: Send approval email to manager
    // await sendEmail({
    //   email: property.manager.email,
    //   subject: 'Property Approved',
    //   message: `Your property "${property.title}" has been approved and is now live.`
    // });

    res.status(200).json({
      success: true,
      message: 'Property approved successfully',
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject property
// @route   PUT /api/admin/properties/:id/reject
// @access  Private (Admin only)
exports.rejectProperty = async (req, res) => {
  try {
    const { reason } = req.body;
    const property = await Property.findById(req.params.id)
      .populate('manager', 'name email');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // TODO: Send rejection email
    // await sendEmail({
    //   email: property.manager.email,
    //   subject: 'Property Rejected',
    //   message: `Your property "${property.title}" has been rejected. Reason: ${reason}`
    // });

    // Delete the property or mark as rejected
    await property.remove();

    res.status(200).json({
      success: true,
      message: 'Property rejected and removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all properties
// @route   GET /api/admin/properties
// @access  Private (Admin only)
exports.getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by verification status
    if (req.query.verified) {
      query.verified = req.query.verified === 'true';
    }

    // Filter by availability
    if (req.query.status) {
      query['availability.status'] = req.query.status;
    }

    const properties = await Property.find(query)
      .populate('manager', 'name email phone')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow admin to delete themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('property', 'title location price')
      .populate('manager', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'manager', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete property (Admin)
// @route   DELETE /api/admin/properties/:id
// @access  Private (Admin only)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await property.remove();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};