const path = require('path');
const festivalService = require('../services/festivalService');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/festivals.html'));
};

// GET /api/festivals
const getAll = (req, res) => {
  const data = festivalService.getAll();
  res.json({ success: true, count: data.length, data });
};

module.exports = { index, getAll };
