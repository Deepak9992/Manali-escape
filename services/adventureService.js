const adventures = [
  {
    id: 1,
    activity: 'Trekking',
    difficulty: 'Easy to Extreme',
    popularRoutes: ['Triund', 'Kheerganga', 'Hampta Pass', 'Pin Parvati Pass', 'Beas Kund'],
    bestSeason: 'May – October',
    description: 'Himachal offers treks for all levels, from gentle meadow walks to high-altitude glacier crossings.'
  },
  {
    id: 2,
    activity: 'Paragliding',
    difficulty: 'Beginner – Advanced',
    popularRoutes: ['Bir Billing', 'Solang Valley', 'Kullu'],
    bestSeason: 'March – May, September – November',
    description: 'Bir Billing is the paragliding capital of India, hosting international championships.'
  },
  {
    id: 3,
    activity: 'Skiing',
    difficulty: 'Beginner – Advanced',
    popularRoutes: ['Solang Valley', 'Rohtang Pass', 'Kufri', 'Narkanda'],
    bestSeason: 'December – February',
    description: 'Snow-covered slopes make Himachal a premier skiing destination in India.'
  },
  {
    id: 4,
    activity: 'River Rafting',
    difficulty: 'Moderate – Difficult',
    popularRoutes: ['Beas River (Kullu)', 'Spiti River', 'Sutlej River'],
    bestSeason: 'July – September',
    description: 'White-water rafting on the Beas and Spiti rivers offers thrilling grade III–IV rapids.'
  },
  {
    id: 5,
    activity: 'Mountain Biking',
    difficulty: 'Moderate – Extreme',
    popularRoutes: ['Manali to Leh', 'Spiti Circuit', 'Shimla to Sarahan'],
    bestSeason: 'June – October',
    description: 'Epic high-altitude cycling routes through remote valleys and mountain passes.'
  },
  {
    id: 6,
    activity: 'Camping',
    difficulty: 'Easy',
    popularRoutes: ['Kasol', 'Chopta Valley', 'Chandratal Lake', 'Prashar Lake'],
    bestSeason: 'April – October',
    description: 'Camp under star-lit skies beside glacial lakes and alpine meadows.'
  }
];

const getAll = () => adventures;

module.exports = { getAll };
