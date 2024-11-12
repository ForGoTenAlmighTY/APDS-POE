// paymentController.js
const Payment = require('../models/Payment');

exports.initiatePayment = async (req, res) => {
  console.log('Initiate payment endpoint hit');
  const { amount, currency, provider, swiftCode } = req.body;

  // Check if user ID is present in the request
  if (!req.user || !req.user.id) {
    return res.status(400).json({ msg: 'User ID missing from request' });
  }

  console.log('User ID:', req.user.id);
  console.log('Payment Details:', { amount, currency, provider, swiftCode });

  try {
    const payment = new Payment({
      userId: req.user.id,
      amount,
      currency,
      provider,
      swiftCode
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Server Error: ' + error.message);
  }
};
