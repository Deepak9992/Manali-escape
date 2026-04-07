const path = require('path');
const { notifyBooking } = require('../services/notificationService');

const bookings = []; // in-memory store (swap for a DB in production)

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/booking.html'));
};

// POST /api/book
const create = async (req, res) => {
  const { name, email, phone, destination, startDate, endDate, travelers, tripType, budget } = req.body;

  if (!name || !email || !destination || !startDate || !endDate || !travelers) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }

  const booking = {
    id:         'HP' + Date.now(),
    name, email, phone,
    destination, startDate, endDate,
    travelers:  parseInt(travelers),
    tripType:   tripType  || 'leisure',
    budget:     budget    || 'moderate',
    createdAt:  new Date().toISOString()
  };

  bookings.push(booking);
  console.log('New booking created:', booking.id);
  console.log('─────────────────────────────────────────');
  console.log('📱 WhatsApp link to notify admin:');
  const waMsg = encodeURIComponent(
    '🏔 New Booking — Manali Escape\n' +
    'ID: ' + booking.id + '\n' +
    'Name: ' + booking.name + '\n' +
    'Destination: ' + booking.destination + '\n' +
    'Dates: ' + booking.startDate + ' → ' + booking.endDate + '\n' +
    'Travelers: ' + booking.travelers + '\n' +
    'Email: ' + booking.email
  );
  console.log('https://wa.me/919805549992?text=' + waMsg);
  console.log('─────────────────────────────────────────');

  // Fire notifications (non-blocking — don't fail the response if Twilio/email errors)
  notifyBooking(booking).catch(err => console.error('Notification dispatch error:', err));

  return res.json({
    success:   true,
    bookingId: booking.id,
    message:   `Booking confirmed! Your ID is ${booking.id}. A confirmation SMS and email have been sent.`
  });
};

// GET /api/bookings
const getAll = (req, res) => {
  res.json({ success: true, count: bookings.length, data: bookings });
};

module.exports = { index, create, getAll };
