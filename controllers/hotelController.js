const path = require('path');

const index = (req, res) => res.sendFile(path.join(__dirname, '../views/hotels.html'));

const hotels = [
  { id: 1, name: 'The Himalayan Resort', location: 'Manali', stars: 5, price: 4500, type: 'Resort', amenities: ['Pool', 'Spa', 'Mountain View', 'Restaurant'], img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', desc: 'Luxury resort with panoramic Himalayan views and world-class amenities.' },
  { id: 2, name: 'Snow Valley Cottages', location: 'Manali', stars: 4, price: 2800, type: 'Cottage', amenities: ['Fireplace', 'Garden', 'Mountain View', 'Breakfast'], img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', desc: 'Cozy wooden cottages nestled in apple orchards with stunning valley views.' },
  { id: 3, name: 'Spiti Eco Lodge', location: 'Spiti Valley', stars: 3, price: 1800, type: 'Eco Lodge', amenities: ['Solar Power', 'Local Food', 'Stargazing', 'Trekking'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', desc: 'Sustainable eco lodge in the heart of Spiti with authentic local experience.' },
  { id: 4, name: 'Shimla Heritage Hotel', location: 'Shimla', stars: 4, price: 3200, type: 'Heritage', amenities: ['Colonial Architecture', 'Library', 'Garden', 'Restaurant'], img: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600', desc: 'A beautifully restored colonial-era property on the famous Mall Road.' },
  { id: 5, name: 'Dharamshala Monastery View', location: 'Dharamshala', stars: 3, price: 2200, type: 'Boutique', amenities: ['Monastery View', 'Yoga', 'Meditation', 'Organic Food'], img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', desc: 'Peaceful boutique hotel overlooking the Namgyal Monastery with yoga facilities.' },
  { id: 6, name: 'Kasol River Camp', location: 'Kasol', stars: 3, price: 1500, type: 'Camp', amenities: ['Riverside', 'Bonfire', 'Trekking', 'Local Cuisine'], img: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600', desc: 'Riverside camping experience along the Parvati River with bonfire nights.' },
];

const getAll = (req, res) => {
  const { location, type, maxPrice } = req.query;
  let filtered = hotels;
  if (location) filtered = filtered.filter(h => h.location === location);
  if (type) filtered = filtered.filter(h => h.type === type);
  if (maxPrice) filtered = filtered.filter(h => h.price <= parseInt(maxPrice));
  res.json({ success: true, data: filtered });
};

const book = async (req, res) => {
  const { guestName, guestEmail, guestPhone, hotelId, checkIn, checkOut, rooms, guests } = req.body;
  if (!guestName || !guestEmail || !hotelId || !checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }
  const hotel = hotels.find(h => h.id === parseInt(hotelId));
  if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found.' });

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const total  = hotel.price * (rooms || 1) * nights;
  const bookingId = 'HTL' + Date.now();

  console.log(`Hotel booking: ${bookingId} — ${guestName} at ${hotel.name}`);

  // WhatsApp notification
  try {
    const twilio = require('twilio');
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (sid && sid.startsWith('AC') && token) {
      const client = twilio(sid, token);
      client.messages.create({
        body: `🏨 *Hotel Booking — Manali Escape*\n\nID: ${bookingId}\n👤 ${guestName}\n📧 ${guestEmail}\n📞 ${guestPhone || '—'}\n🏨 ${hotel.name}, ${hotel.location}\n📅 ${checkIn} → ${checkOut} (${nights} nights)\n🛏 Rooms: ${rooms || 1} | Guests: ${guests || 1}\n💰 Total: ₹${total.toLocaleString('en-IN')}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE
      }).catch(e => console.warn('WA error:', e.message));
    }
  } catch(e) { console.warn(e.message); }

  res.json({ success: true, bookingId, hotel: hotel.name, nights, total, message: `Hotel booked! ID: ${bookingId}. We'll confirm within 2 hours.` });
};

module.exports = { index, getAll, book };
