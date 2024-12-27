const fs = require('fs');
const path = require('path');

const rulesFile = path.join(__dirname, 'rules.json');
const rules = JSON.parse(fs.readFileSync(rulesFile, 'utf8'));

const inspectPayload = (payload) => {
  const payloadString = JSON.stringify(payload).toLowerCase();

  for (const pattern of rules.blacklistPatterns) {
    if (payloadString.includes(pattern.toLowerCase())) {
      console.warn(Malicious payload detected: ${payloadString});
      return true;
    }
  }

  return false;
};

module.exports = { inspectPayload };