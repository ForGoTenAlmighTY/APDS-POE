// auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID and role to the request for further authorization needs
    req.user = { id: decoded.id };

    console.log('Token verified, user ID:', req.user.id);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
