const path = require('path');
const adventureService = require('../services/adventureService');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/adventure.html'));
};

// GET /api/adventure
const getAll = (req, res) => {
  const data = adventureService.getAll();
  res.json({ success: true, count: data.length, data });
};

module.exports = { index, getAll };
