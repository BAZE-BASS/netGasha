const { inspectPayload } = require('../waf/wafEngine');

const wafMiddleware = (req, res, next) => {
  const { body, query } = req;

  if (inspectPayload(body) || inspectPayload(query)) {
    res.status(403).send('Access denied: Malicious payload detected.');
    return;
  }

  next();
};

module.exports = wafMiddleware;