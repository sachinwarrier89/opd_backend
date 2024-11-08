// index.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for image data

// Morgan middleware for logging
app.use(morgan('combined')); // Use 'combined' predefined format for logging


// Serve static files if using local storage
if (config.storage.provider === 'local') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});
