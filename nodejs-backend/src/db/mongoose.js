
const mongoose = require('mongoose');

//const dbpath = C:\mongodb-data
// run command mongod --dbpath C:\mongodb-data
const mongoURI = "mongodb://127.0.0.1:27017/employee_management"; // Replace 'mydatabase' with your database name

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
