// src/components/common/Homepage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>Banking Website</h1>
      <div className="button-container">
        <button onClick={() => navigate('/employee-login')}>Employee Login</button>
        <button onClick={() => navigate('/customer-login')}>Customer Login</button>
      </div>
    </div>
  );
};

export default Homepage;
