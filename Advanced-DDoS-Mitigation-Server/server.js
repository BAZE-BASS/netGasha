const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ddosMiddleware = require('./middlewares/ddosMiddleware');
const botDetectionMiddleware = require('./middlewares/botDetectionMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());

// Logging Middleware
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Request Parsing Middleware
app.use(express.json());

// DDoS and Bot Detection Middleware
app.use(ddosMiddleware);
app.use(botDetectionMiddleware);

// Routes
app.use('/admin', adminRoutes);
app.use('/monitoring', monitoringRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Advanced DDoS Mitigation Server!');
});

// Start Server
app.listen(PORT, () => {
  console.log(Server running at http://localhost:${PORT});
});