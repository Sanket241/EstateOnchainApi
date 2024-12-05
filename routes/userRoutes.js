const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin, apiKey } = require('../middleware/auth');
const {
  registerValidator,
  loginValidator,
  updateValidator,
  verifyValidator
} = require('../middleware/validators');

// Public routes
router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);

// Protected routes
router.get('/search', protect, userController.searchUsers);
router.put('/:id', protect, updateValidator, userController.updateUser);
router.post('/logout', protect, userController.logout);

// Admin routes
router.patch('/:userId/verify', protect, admin, verifyValidator, userController.verifyUser);

// API Key protected routes
router.get('/eth/:ethAddress', apiKey, userController.findByEthAddress);

module.exports = router;
