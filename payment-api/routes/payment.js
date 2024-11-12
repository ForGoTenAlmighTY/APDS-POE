// routes/payment.js
const express = require('express');
const router = express.Router();
const { initiatePayment } = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment'); // Import the Payment model

// Middleware to validate payment details
const validatePayment = (req, res, next) => {
  const { amount, currency, provider, swiftCode } = req.body;

  // Regex for validating the amount (positive numbers, can include decimals)
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (!amountRegex.test(amount)) {
    return res.status(400).json({ message: 'Invalid amount format. Amount must be a positive number with up to two decimal places.' });
  }

  // Regex for validating the currency (only alphabetic characters allowed)
  const currencyRegex = /^[A-Za-z]{3}$/;
  if (!currencyRegex.test(currency)) {
    return res.status(400).json({ message: 'Invalid currency format. Currency should be a 3-letter code (e.g., USD, EUR).' });
  }

  // Regex for validating the provider (can be alphanumeric)
  const providerRegex = /^[A-Za-z0-9\s]{3,50}$/;  // Adjust length range as necessary
  if (!providerRegex.test(provider)) {
    return res.status(400).json({ message: 'Invalid provider format. Provider name should be alphanumeric and between 3 to 50 characters.' });
  }

  // Regex for validating the SWIFT code (standard 8 or 11 characters)
  const swiftCodeRegex = /^[A-Za-z]{4}[A-Za-z]{2}[0-9A-Za-z]{2}[A-Za-z0-9]{3}?$/;
  if (!swiftCodeRegex.test(swiftCode)) {
    return res.status(400).json({ message: 'Invalid SWIFT code format. SWIFT code must be 8 or 11 characters (letters and numbers).' });
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};

// Route to initiate a payment (requires authentication and validation)
router.post('/payment', auth, validatePayment, initiatePayment);

// Route to retrieve all payments for employees to view
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }); // Get payments for the authenticated user
    res.json(payments); // Return payments data
  } catch (error) {
    console.error('Error retrieving payments:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
