const festivals = [
  {
    id: 1,
    name: 'Kullu Dussehra',
    month: 'October',
    location: 'Dhalpur Maidan, Kullu',
    description: 'One of the most famous festivals in India, celebrated for 7 days with a grand procession of deities, folk music, and cultural performances.',
    significance: 'Marks the victory of good over evil; unique in that it begins when Dussehra ends elsewhere in India.'
  },
  {
    id: 2,
    name: 'Losar',
    month: 'February / March',
    location: 'Spiti, Lahaul, Kinnaur',
    description: 'Tibetan New Year celebrated with traditional dances, prayers, and feasts in the Buddhist communities of Himachal.',
    significance: 'Marks the beginning of the Tibetan lunar calendar year.'
  },
  {
    id: 3,
    name: 'Halda',
    month: 'November',
    location: 'Lahaul Valley',
    description: 'A festival of lights similar to Diwali, celebrated by the people of Lahaul with bonfires and traditional rituals.',
    significance: 'Symbolises the triumph of light over darkness in the remote Lahaul valley.'
  },
  {
    id: 4,
    name: 'Sazo',
    month: 'June',
    location: 'Kinnaur Valley',
    description: 'An ancient festival of Kinnaur celebrating the sowing season with prayers, folk songs, and community gatherings.',
    significance: 'Collective expression of religious reverence and gratitude for a good harvest.'
  },
  {
    id: 5,
    name: 'Minjar Fair',
    month: 'July – August',
    location: 'Chamba',
    description: 'A week-long fair in Chamba celebrating the onset of the maize crop season with processions, music, and sports.',
    significance: 'One of the oldest fairs in Himachal, dating back over 1,000 years.'
  },
  {
    id: 6,
    name: 'Shivratri Fair',
    month: 'February – March',
    location: 'Mandi',
    description: 'Known as the "Choti Kashi of Hills", Mandi hosts a grand week-long fair with over 200 deities brought in procession.',
    significance: 'One of the largest religious fairs in Himachal Pradesh.'
  }
];

const getAll = () => festivals;

module.exports = { getAll };
