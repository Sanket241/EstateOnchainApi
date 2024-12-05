const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const { validationResult } = require('express-validator');

// Create JWT Token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Register User
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation error', 400));
    }

    const userExists = await User.findOne({ 
      $or: [
        { email: req.body.email },
        { ethAddress: req.body.ethAddress }
      ]
    });

    if (userExists) {
      return next(new AppError('User with this email or ETH address already exists', 400));
    }

    const user = await User.create(req.body);
    const token = createToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    const token = createToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Search Users with Filtering and Sorting
exports.searchUsers = async (req, res, next) => {
  try {
    const {
      search,
      country,
      state,
      kycType,
      isVerified,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filters
    if (country) query.country = country;
    if (state) query.state = state;
    if (kycType) query.kycType = kycType;
    if (isVerified !== undefined) query.isVerified = isVerified === 'true';

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password');

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: users.length,
        totalRecords: total
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Find User by ETH Address
exports.findByEthAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ ethAddress: req.params.ethAddress });
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Verify User
exports.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isVerified: req.body.isVerified },
      { new: true }
    );

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Logout (Token blacklisting would be implemented here)
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
