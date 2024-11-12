import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging token
        const response = await api.get('/api/payments', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Payments Response:', response.data); // Debugging API response
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Payment History</h1>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <li key={index}>
              {payment.amount} {payment.currency} to {payment.recipient} on {new Date(payment.date).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No payments found.</li>
        )}
      </ul>
    </div>
  );
};

export default PaymentList;
