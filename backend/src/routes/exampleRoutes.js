const express = require('express');
const router = express.Router();
const { getExampleData } = require('../controllers/exampleController');
const { protect } = require('../middlewares/authMiddleware');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware');

// Public route example
// router.post('/login', loginController);

// Protected route example using the auth middleware AND caching (caches for 60 seconds)
router.get('/data', protect, cacheMiddleware(60), getExampleData);

module.exports = router;
