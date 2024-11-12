// src/components/auth/Register.jsx
import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    accountNumber: '',
    idNumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await api.post('/auth/register', userData);
    alert('Registration successful');
    navigate('/customer-login'); // Customer is directed to log in
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />
        <label>Account Number:</label>
        <input type="text" name="accountNumber" onChange={handleChange} required />
        <label>ID Number:</label>
        <input type="text" name="idNumber" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
