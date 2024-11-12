// src/components/auth/EmployeeLogin.jsx
import React, { useState } from 'react';
import api, { setAuthToken } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Sending login request to API');
      const response = await api.post('/employee/login', { email, password });
      const { token } = response.data;

      setAuthToken(token); // Set token for future requests
      localStorage.setItem('token', token); // Save token to local storage

      navigate('/employee-payments'); // Redirect after setting token
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-login-form">
      <h2>Employee Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default EmployeeLogin;
