// src/components/payments/PaymentForm.jsx
import React, { useState } from 'react';
import api from '../../utils/api';
import './PaymentForm.css';  // Import the CSS file

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    currency: '',
    provider: '',
    swiftCode: ''
  });

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/payments/payment', paymentDetails);
      alert('Payment successful!');
      // Optionally reset form or handle next steps
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={paymentDetails.amount}
        onChange={handleChange}
        required
      />
      <label htmlFor="currency">Currency:</label>
      <input
        type="text"
        id="currency"
        name="currency"
        value={paymentDetails.currency}
        onChange={handleChange}
        required
      />
      <label htmlFor="provider">Provider:</label>
      <input
        type="text"
        id="provider"
        name="provider"
        value={paymentDetails.provider}
        onChange={handleChange}
        required
      />
      <label htmlFor="swiftCode">SWIFT Code:</label>
      <input
        type="text"
        id="swiftCode"
        name="swiftCode"
        value={paymentDetails.swiftCode}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
