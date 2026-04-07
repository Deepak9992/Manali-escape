const path = require('path');
const { notifyBooking } = require('../services/notificationService');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contact.html'));
};

// POST /contact
const submit = async (req, res) => {
  const { name, email, message, interest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  console.log(`Contact form from ${name} <${email}>: ${message}`);

  // Send WhatsApp notification to admin
  const fakeBooking = {
    id: 'CONTACT-' + Date.now(),
    name, email,
    phone: null,
    destination: interest || 'General Enquiry',
    startDate: '—', endDate: '—',
    travelers: 1,
    tripType: 'enquiry',
    budget: '—',
    createdAt: new Date().toISOString(),
    _isContact: true,
    _message: message
  };

  // Fire WhatsApp to admin (non-blocking)
  try {
    const twilio = require('twilio');
    const sid   = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (sid && sid.startsWith('AC') && token) {
      const client = twilio(sid, token);
      const msg =
        `📩 *New Contact Message — Manali Escape*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `🎯 *Interest:* ${interest || 'General Enquiry'}\n\n` +
        `💬 *Message:*\n${message}`;
      client.messages.create({
        body: msg,
        from: process.env.TWILIO_PHONE_NUMBER,
        to:   process.env.ADMIN_PHONE
      }).catch(e => console.warn('WhatsApp notify failed:', e.message));
    }
  } catch(e) {
    console.warn('Contact notify error:', e.message);
  }

  res.json({ success: true, message: `Thank you, ${name}! We'll get back to you at ${email} within 24 hours.` });
};

module.exports = { index, submit };
