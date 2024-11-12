const mongoose = require('mongoose');
const Employee = require('../models/employee');  
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords
require('dotenv').config({ path: './.env' });  


// Connect to MongoDB
const connectDB = async () => {
    try {
      console.log("MONGO_URI", process.env.MONGO_URI); 
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'paymentsDB',
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  };

// Add employee data to the database
const addEmployees = async () => {
  const employees = [
    { name: 'Alice Johnson', email: 'alice.johnson@bank.com', role: 'employee', password: 'defaultPassword123' },
    { name: 'Charlie Brown', email: 'charlie.brown@bank.com', role: 'manager', password: 'defaultPassword123' },
  ];

  try {
    // Hash passwords before saving to the database
    for (let employee of employees) {
      employee.password = await bcrypt.hash(employee.password, 10); // Hash the password
    }

    await Employee.insertMany(employees);
    console.log('Employees added successfully');
  } catch (error) {
    console.error('Error adding employees:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the functions
connectDB().then(addEmployees);
