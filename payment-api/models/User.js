const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true },
  idNumber: { type: String, required: true }, // Added ID Number field
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
