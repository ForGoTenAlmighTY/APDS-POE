// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Homepage from './components/common/Homepage';
import EmployeeLogin from './components/auth/EmployeeLogin';
import CustomerLogin from './components/auth/CustomerLogin';
import Register from './components/auth/Register';
import PaymentForm from './components/payments/PaymentForm';
import PaymentList from './components/employee-payments/PaymentList';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payments" element={<PaymentForm />} />
          <Route path="/employee-payments" element={<PaymentList />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
