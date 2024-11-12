// src/components/auth/CustomerLogin.jsx
import React, { useState } from 'react';
import api, { setAuthToken } from '../../utils/api'; // Make sure to import setAuthToken
import { useNavigate } from 'react-router-dom';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Sending login request to API');
      const response = await api.post('/auth/login', { email, password, accountNumber });
      const { token } = response.data;
  
      setAuthToken(token);
      localStorage.setItem('token', token);
  
      navigate('/payments'); // Redirect after setting token
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="customer-login-container">
      <form onSubmit={handleSubmit} className="customer-login-form">
        <h2>Customer Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Account Number:</label>
        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
