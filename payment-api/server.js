const express = require('express');
const https = require('https');
const fs = require('fs');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const auth = require('./middleware/auth'); // Import the auth middleware
require('dotenv').config();

const app = express();

// Connect to the database
connectDB().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});

// CORS Options
const corsOptions = {
  origin: 'https://localhost:5173', // Updated to match the new front-end domain
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

// Global Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(globalLimiter);

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/payments', auth, require('./routes/payment')); // Protect payment routes
app.use('/api/employee', require('./routes/employee')); // Employee routes, auth applied within route file

const PORT = process.env.PORT || 5000;

// SSL certificate paths
const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert'),
};

// Starting both http & https server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server started on port ${PORT} with SSL`);
});
