const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../redisClient');
const { geofencingCheck } = require('../services/geofencingService');
const { rateLimitPoints, rateLimitDuration, blockDuration } = require('../config');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: rateLimitPoints,
  duration: rateLimitDuration,
  blockDuration,
});

const ddosMiddleware = async (req, res, next) => {
  const ip = req.ip;

  // Geofencing
  const isAllowed = await geofencingCheck(ip);
  if (!isAllowed) {
    res.status(403).send('Access denied: Your region is blocked.');
    return;
  }

  // Rate limiting
  try {
    await rateLimiter.consume(ip);
    next();
  } catch {
    res.status(429).send('Too many requests: You are temporarily blocked.');
  }
};

module.exports = ddosMiddleware;