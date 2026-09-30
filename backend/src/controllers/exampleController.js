const db = require('../config/db');

// Example controller function
const getExampleData = async (req, res) => {
  try {
    // You can write your DB query here, e.g.
    // const { rows } = await db.query('SELECT * FROM users');
    
    res.status(200).json({
      message: 'Example data fetched successfully',
      user: req.user, // Available if route is protected
      data: []
    });
  } catch (error) {
    console.error('Error in getExampleData:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getExampleData
};
