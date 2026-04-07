const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/taxi.html'));
};

// Static taxi directory per destination (curated + OSM-backed)
const taxiDirectory = {
  Manali: [
    { name: 'Manali Taxi Union',        driver: null,    phone: '+91-1902-252323', type: 'Union',   rating: 4.5, note: 'Official govt-registered union. Fixed rates.' },
    { name: 'Rohtang Taxi Operators',   driver: 'Rahul', phone: '+918278840575',   type: 'Private', rating: 4.8, note: 'Specialises in Rohtang Pass & Solang Valley.' },
    { name: 'Kullu-Manali Cab Service', driver: 'Harsh', phone: '+919805130497',   type: 'Private', rating: 4.7, note: 'Airport transfers and outstation trips.' },
    { name: 'Himalayan Cabs',           driver: null,    phone: '+91-9816098765',  type: 'Private', rating: 4.4, note: 'AC cabs, Innova & Tempo Traveller available.' },
  ],
  Shimla: [
    { name: 'Shimla Taxi Stand',        phone: '+91-177-2652345', type: 'Union',   rating: 4.4, note: 'Main taxi stand near Cart Road.' },
    { name: 'HP Tourism Taxi',          phone: '+91-177-2652648', type: 'Govt',    rating: 4.6, note: 'Government-run, reliable fixed-rate service.' },
    { name: 'Kufri Cab Services',       phone: '+91-9816034567',  type: 'Private', rating: 4.1, note: 'Kufri, Chail, and Narkanda day trips.' },
  ],
  'Spiti Valley': [
    { name: 'Spiti Valley Taxi Union',  phone: '+91-1906-222456', type: 'Union',   rating: 4.6, note: 'Only reliable option in Spiti. Book in advance.' },
    { name: 'Kaza Taxi Stand',          phone: '+91-9816056789',  type: 'Union',   rating: 4.5, note: 'Covers Kaza, Key Monastery, Chandratal.' },
  ],
  Dharamshala: [
    { name: 'Dharamshala Taxi Union',   phone: '+91-1892-224567', type: 'Union',   rating: 4.3, note: 'McLeod Ganj, Triund base, Kangra Fort.' },
    { name: 'McLeod Ganj Cabs',         phone: '+91-9816078901',  type: 'Private', rating: 4.4, note: 'Local sightseeing and Pathankot transfers.' },
    { name: 'Kangra Valley Travels',    phone: '+91-9805234567',  type: 'Private', rating: 4.2, note: 'Palampur, Bir Billing, Baijnath day trips.' },
  ],
  Kasol: [
    { name: 'Kasol Taxi Stand',         phone: '+91-9816090123',  type: 'Union',   rating: 4.2, note: 'Kheerganga base, Manikaran, Bhuntar.' },
    { name: 'Parvati Valley Cabs',      phone: '+91-9805345678',  type: 'Private', rating: 4.3, note: 'Tosh, Pulga, Chalal village transfers.' },
  ],
  'Bir Billing': [
    { name: 'Bir Taxi Union',           phone: '+91-9816012678',  type: 'Union',   rating: 4.4, note: 'Billing takeoff point, Palampur, Baijnath.' },
    { name: 'Billing Adventure Cabs',   phone: '+91-9805456789',  type: 'Private', rating: 4.5, note: 'Paragliding site transfers, luggage handling.' },
  ],
};

// Fare estimates (per km in INR, approx)
const fareRates = {
  Hatchback:       { perKm: 12, base: 100 },
  Sedan:           { perKm: 14, base: 120 },
  SUV:             { perKm: 18, base: 150 },
  'Tempo Traveller': { perKm: 22, base: 200 },
};

// GET /api/taxis?destination=Manali
const getByDestination = (req, res) => {
  const dest = req.query.destination;
  if (!dest || !taxiDirectory[dest]) {
    return res.json({ success: true, data: [], message: 'No taxi data for this destination.' });
  }
  res.json({ success: true, destination: dest, data: taxiDirectory[dest], fareRates });
};

// GET /api/taxis/all
const getAll = (req, res) => {
  res.json({ success: true, data: taxiDirectory, fareRates });
};

module.exports = { index, getByDestination, getAll };
