const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/cuisine.html'));
};

module.exports = { index };
