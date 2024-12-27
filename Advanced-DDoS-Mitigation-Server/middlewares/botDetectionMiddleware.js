const { detectAnomaly } = require('../services/anomalyDetectionService');

const botDetectionMiddleware = (req, res, next) => {
  if (detectAnomaly(req)) {
    res.status(403).send('Access denied: Suspicious activity detected.');
    return;
  }
  next();
};

module.exports = botDetectionMiddleware;