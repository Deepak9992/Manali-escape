const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contact.html'));
};

// POST /contact
const submit = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // In production: send email / save to DB here
  console.log(`Contact form submission from ${name} <${email}>: ${message}`);

  res.json({ success: true, message: `Thank you, ${name}! We will get back to you soon.` });
};

module.exports = { index, submit };
