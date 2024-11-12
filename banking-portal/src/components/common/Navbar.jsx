// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/employee-login" className="nav-link">Employee Login</Link>
      <Link to="/customer-login" className="nav-link">Customer Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </nav>
  );
};

export default Navbar;
