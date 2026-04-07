const destinations = [
  {
    id: 1,
    name: 'Manali',
    region: 'Kullu',
    description: 'A high-altitude Himalayan resort town known for Solang Valley, Rohtang Pass, and the ancient Hadimba Temple.',
    bestTime: 'October – June',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Manali_Himachal_Pradesh.jpg/640px-Manali_Himachal_Pradesh.jpg'
  },
  {
    id: 2,
    name: 'Shimla',
    region: 'Shimla',
    description: 'The capital city, once the summer capital of British India, famous for The Ridge, Mall Road, and colonial architecture.',
    bestTime: 'March – June, December – January',
    highlights: ['The Ridge', 'Mall Road', 'Jakhu Temple', 'Kufri'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shimla_in_winters.jpg/640px-Shimla_in_winters.jpg'
  },
  {
    id: 3,
    name: 'Spiti Valley',
    region: 'Lahaul & Spiti',
    description: 'A cold desert mountain valley known for Key Monastery, Chandratal Lake, and dramatic landscapes.',
    bestTime: 'June – October',
    highlights: ['Key Monastery', 'Chandratal Lake', 'Kaza', 'Pin Valley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Spiti_Valley.jpg/640px-Spiti_Valley.jpg'
  },
  {
    id: 4,
    name: 'Dharamshala / McLeod Ganj',
    region: 'Kangra',
    description: 'Home of the Dalai Lama and Tibetan government-in-exile, blending Tibetan culture with Himalayan scenery.',
    bestTime: 'March – June, September – November',
    highlights: ['Namgyal Monastery', 'Triund Trek', 'Bhagsu Waterfall', 'Kangra Fort'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/McLeod_Ganj.jpg/640px-McLeod_Ganj.jpg'
  },
  {
    id: 5,
    name: 'Kasol',
    region: 'Kullu',
    description: 'Known as the Amsterdam of India, a backpacker haven along the Parvati River with stunning trekking routes.',
    bestTime: 'October – June',
    highlights: ['Kheerganga Trek', 'Manikaran Gurudwara', 'Chalal Village', 'Parvati River'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kasol.jpg/640px-Kasol.jpg'
  },
  {
    id: 6,
    name: 'Bir Billing',
    region: 'Kangra',
    description: 'The paragliding capital of India, also home to Palpung Sherabling Monastery and Tibetan settlements.',
    bestTime: 'March – May, September – November',
    highlights: ['Paragliding', 'Palpung Sherabling Monastery', 'Bir Tea Gardens', 'Billing Meadows'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bir_Billing.jpg/640px-Bir_Billing.jpg'
  }
];

const getAll = () => destinations;

const getById = (id) => destinations.find(d => d.id === parseInt(id));

module.exports = { getAll, getById };
