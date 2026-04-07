const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/heritage.html'));
};

module.exports = { index };
