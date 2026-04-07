const path = require('path');
const index = (req, res) => res.sendFile(path.join(__dirname, '../views/gallery.html'));
module.exports = { index };
