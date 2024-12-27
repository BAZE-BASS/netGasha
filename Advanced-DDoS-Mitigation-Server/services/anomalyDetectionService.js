const fs = require('fs');
const path = require('path');

const anomalyLogFile = path.join(__dirname, '../logs/anomaly.log');

const detectAnomaly = (req) => {
  const { ip, headers } = req;
  const userAgent = headers['user-agent'];

  // Detect anomalies (e.g., missing User-Agent)
  if (!userAgent || userAgent.toLowerCase().includes('bot')) {
    const logEntry = Anomaly detected: IP=${ip}, User-Agent=${userAgent}\n;
    fs.appendFileSync(anomalyLogFile, logEntry);
    return true;
  }

  return false;
};

module.exports = { detectAnomaly };