const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/access.log');

const getTrafficLogs = (req, res) => {
  fs.readFile(logFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading logs.');
    } else {
      res.type('text/plain').send(data);
    }
  });
};

module.exports = { getTrafficLogs };