const path = require('path');

const index = (req, res) => res.sendFile(path.join(__dirname, '../views/packages.html'));

const packages = [
  { id: 1, name: 'Manali Adventure Escape', duration: '5 Days / 4 Nights', price: 12999, perPerson: true, destinations: ['Manali', 'Solang Valley', 'Rohtang Pass'], includes: ['Hotel Stay', 'Breakfast & Dinner', 'Taxi', 'Trekking Guide', 'Paragliding'], img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600', badge: 'Best Seller', desc: 'The ultimate Manali experience — snow, adventure, and mountain magic.' },
  { id: 2, name: 'Spiti Valley Explorer', duration: '7 Days / 6 Nights', price: 18999, perPerson: true, destinations: ['Spiti', 'Key Monastery', 'Chandratal', 'Kaza'], includes: ['Homestay', 'All Meals', 'Taxi', 'Monastery Visits', 'Camping'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', badge: 'Premium', desc: 'Journey through the cold desert — ancient monasteries, starlit skies, raw beauty.' },
  { id: 3, name: 'Shimla Heritage Tour', duration: '3 Days / 2 Nights', price: 7999, perPerson: true, destinations: ['Shimla', 'Kufri', 'Chail'], includes: ['Hotel Stay', 'Breakfast', 'Taxi', 'Mall Road Tour', 'Toy Train'], img: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600', badge: 'Weekend Getaway', desc: 'Colonial charm, mountain air, and the iconic toy train — perfect weekend escape.' },
  { id: 4, name: 'Dharamshala Wellness Retreat', duration: '4 Days / 3 Nights', price: 9999, perPerson: true, destinations: ['Dharamshala', 'McLeod Ganj', 'Triund'], includes: ['Boutique Hotel', 'Yoga Sessions', 'Meditation', 'Meals', 'Triund Trek'], img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', badge: 'Wellness', desc: 'Reconnect with yourself — yoga, meditation, and the Dalai Lama\'s hometown.' },
  { id: 5, name: 'Parvati Valley Backpacker', duration: '6 Days / 5 Nights', price: 8999, perPerson: true, destinations: ['Kasol', 'Kheerganga', 'Tosh', 'Manikaran'], includes: ['Guesthouse', 'Breakfast', 'Trekking', 'Hot Springs Visit', 'Local Guide'], img: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600', badge: 'Budget Friendly', desc: 'The backpacker\'s paradise — riverside camps, hot springs, and hidden villages.' },
  { id: 6, name: 'Himachal Honeymoon Special', duration: '7 Days / 6 Nights', price: 24999, perPerson: false, destinations: ['Shimla', 'Manali', 'Solang Valley'], includes: ['Luxury Hotels', 'All Meals', 'Private Taxi', 'Candlelight Dinner', 'Spa'], img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', badge: 'Honeymoon', desc: 'A romantic journey through the Himalayas — luxury, privacy, and unforgettable moments.' },
];

const getAll = (req, res) => res.json({ success: true, data: packages });

const book = async (req, res) => {
  const { guestName, guestEmail, guestPhone, packageId, travelDate, travelers } = req.body;
  if (!guestName || !guestEmail || !packageId || !travelDate) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }
  const pkg = packages.find(p => p.id === parseInt(packageId));
  if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });

  const count = parseInt(travelers) || 1;
  const total = pkg.perPerson ? pkg.price * count : pkg.price;
  const bookingId = 'PKG' + Date.now();

  console.log(`Package booking: ${bookingId} — ${guestName} for ${pkg.name}`);

  // WhatsApp notification
  try {
    const twilio = require('twilio');
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (sid && sid.startsWith('AC') && token) {
      const client = twilio(sid, token);
      client.messages.create({
        body: `🎒 *Package Booking — Manali Escape*\n\nID: ${bookingId}\n👤 ${guestName}\n📧 ${guestEmail}\n📞 ${guestPhone || '—'}\n📦 ${pkg.name}\n⏱ ${pkg.duration}\n📅 Travel Date: ${travelDate}\n👥 Travelers: ${count}\n💰 Total: ₹${total.toLocaleString('en-IN')}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE
      }).catch(e => console.warn('WA error:', e.message));
    }
  } catch(e) { console.warn(e.message); }

  res.json({ success: true, bookingId, package: pkg.name, total, message: `Package booked! ID: ${bookingId}. Our team will contact you within 24 hours.` });
};

module.exports = { index, getAll, book };
