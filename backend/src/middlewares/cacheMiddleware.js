const NodeCache = require('node-cache');

// Standard TTL (Time To Live) is set to 5 minutes (300 seconds)
const cache = new NodeCache({ stdTTL: 300 });

/**
 * Caching Middleware
 * 
 * @param {number} duration - Time in seconds to keep the response in cache
 */
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create a unique key using the URL and, if applicable, the user ID 
    // (so different users don't see each other's cached private data)
    const key = `__express__${req.originalUrl || req.url}_${req.user ? req.user.id : 'guest'}`;

    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`Cache hit for ${key}`);
      return res.status(200).json(cachedResponse);
    } else {
      console.log(`Cache miss for ${key}`);
      
      // Store the original res.json function
      const originalJson = res.json;

      // Override res.json to intercept the response
      res.json = (body) => {
        // Cache the response body using the provided duration
        cache.set(key, body, duration);
        
        // Call the original res.json function to send the response
        originalJson.call(res, body);
      };
      
      next();
    }
  };
};

module.exports = {
  cacheMiddleware,
  cache // Exporting cache instance in case we need to manually invalidate cache later
};
