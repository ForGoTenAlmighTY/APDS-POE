import api from './api';

const createPayment = async (paymentData) => {
  return api.post('/payments/payment', paymentData);
};

const fetchPayments = async () => {
  return api.get('/payments/payment');
};

export default { createPayment, fetchPayments };
