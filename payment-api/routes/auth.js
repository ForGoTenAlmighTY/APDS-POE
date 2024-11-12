const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

// Updated regex patterns
const accountNumberPattern = /^[0-9]{10}$/;
const idNumberPattern = /^[0-9]{13}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Registration route
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
    check('idNumber').matches(idNumberPattern).withMessage('ID Number must be exactly 13 digits'),
    check('accountNumber').matches(accountNumberPattern).withMessage('Account Number must be exactly 10 digits')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

// Login route
router.post(
  '/login',
  [
    check('email').matches(emailPattern).withMessage('Please include a valid email'),
    check('password').exists().withMessage('Password is required'),
    check('accountNumber').matches(accountNumberPattern).withMessage('Account Number must be exactly 10 digits')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginUser
);

// Get user details route
router.get('/user/:id', getUserDetails);

module.exports = router;
