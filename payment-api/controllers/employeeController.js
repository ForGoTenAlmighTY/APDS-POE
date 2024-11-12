// employeeController.js
const Employee = require('../models/employee'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Payment = require('../models/Payment');

// Employee login function
exports.employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request received:', req.body);

    const employee = await Employee.findOne({ email });
    if (!employee) {
      console.log('Invalid Credentials: employee not found');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log('Invalid Credentials: password does not match');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated Token:', token);
    res.json({ token });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send('Server Error');
  }
};


// Verify transaction function
exports.verifyTransaction = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const payment = await Payment.findById(transactionId);
        if (!payment) return res.status(404).json({ msg: 'Transaction not found' });
        // Verify the transaction
        payment.status = 'Verified';
        await payment.save();
        res.json({ msg: 'Transaction verified successfully' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
