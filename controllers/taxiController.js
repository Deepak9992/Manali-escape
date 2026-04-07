const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/taxi.html'));
};

const drivers = [
  { name: 'Rahul', phone: '+918278840575', type: 'Private', rating: 4.8, note: 'Specialises in Rohtang Pass, Solang Valley & local sightseeing.' },
  { name: 'Harsh', phone: '+919805130497', type: 'Private', rating: 4.7, note: 'Airport transfers, outstation trips & Manali city tours.' },
];

const getAll = (req, res) => res.json({ success: true, data: drivers });
const getByDestination = (req, res) => res.json({ success: true, data: drivers });

module.exports = { index, getByDestination, getAll };
