const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Routing file './routes/bootcamps.js
const bootcamps = require('./routes/bootcamps');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount router to a specific file in this case './routes/bootcamps.js
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled rejections/errors/uncaught promises
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});