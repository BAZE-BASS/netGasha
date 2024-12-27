const mongoose = require('mongoose');

const trafficLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  endpoint: { type: String, required: true },
});

const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);

module.exports = TrafficLog;