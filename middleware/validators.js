const { check } = require('express-validator');

exports.registerValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('ethAddress')
    .trim()
    .notEmpty()
    .withMessage('Ethereum address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid Ethereum address format'),
  check('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  check('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  check('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  check('kycType')
    .trim()
    .notEmpty()
    .withMessage('KYC type is required')
    .isIn(['pancard', 'passport', 'aadhar card'])
    .withMessage('Invalid KYC type'),
  check('kycId')
    .trim()
    .notEmpty()
    .withMessage('KYC ID is required')
];

exports.loginValidator = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
];

exports.updateValidator = [
  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),
  check('country')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Country cannot be empty'),
  check('state')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('State cannot be empty'),
  check('address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address cannot be empty')
];

exports.verifyValidator = [
  check('isVerified')
    .isBoolean()
    .withMessage('isVerified must be a boolean value')
];
