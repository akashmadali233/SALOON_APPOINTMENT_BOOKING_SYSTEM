const express = require('express');
const sequelize = require('./config/database');
const compression = require('compression');
const multer = require('multer');
const upload = multer();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(compression());

// // Import routes
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const staffRoutes = require('./routes/staffRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// // Use routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/appointments', appointmentRoutes);
// app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
// app.use('/api/admin', adminRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

// Sync models with the database
sequelize.sync({force:true})
  .then(() => console.log('Models synchronized with the database'))
  .catch(err => console.error('Error syncing models:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Salon Appointment Booking System API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
