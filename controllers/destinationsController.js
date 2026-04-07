const path = require('path');
const destinationService = require('../services/destinationService');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/destinations.html'));
};

// GET /api/destinations
const getAll = (req, res) => {
  const data = destinationService.getAll();
  res.json({ success: true, count: data.length, data });
};

// GET /api/destinations/:id
const getById = (req, res) => {
  const item = destinationService.getById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Destination not found' });
  res.json({ success: true, data: item });
};

module.exports = { index, getAll, getById };
