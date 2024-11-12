//authController.js
const User = require('../models/User');  // Import the User model
const bcrypt = require('bcrypt');         // For hashing passwords
const jwt = require('jsonwebtoken');      // For generating JSON Web Tokens

// Registration function
exports.registerUser = async (req, res) => {
  const { name, email, password, accountNumber, idNumber } = req.body; // Include idNumber

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, accountNumber, idNumber });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Login function
exports.loginUser = async (req, res) => {
  console.log('Login endpoint hit');
  const { email, password, accountNumber } = req.body; // Include accountNumber

  try {
    const user = await User.findOne({ email, accountNumber });
    if (!user) {
      console.log('Invalid Credentials');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid Credentials');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log('User logged in successfully:', user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server Error');
  }
};


// Get user details function
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
