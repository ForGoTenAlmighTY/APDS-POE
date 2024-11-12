// routes/employee.js
const express = require('express');
const router = express.Router();
const { employeeLogin, verifyTransaction } = require('../controllers/employeeController');
const auth = require('../middleware/auth'); // Import the auth middleware

// Middleware to validate email format using regex
const validateEmail = (req, res, next) => {
  const { email } = req.body;

  // Regex for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }
  
  next();
};

// Employee login route (no auth middleware)
router.post('/login', validateEmail, employeeLogin);

// Verify transaction route (protected with auth middleware)
router.post('/verify', auth, verifyTransaction);

module.exports = router;
