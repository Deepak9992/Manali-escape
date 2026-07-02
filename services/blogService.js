const fs   = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '../views/blogs');

// Registry — add metadata when you create a new blog HTML file
// slug must match the filename (without .html)
const blogRegistry = [
  {
    slug:    'complete-manali-travel-guide-2026',
    title:   'Complete Manali Travel Guide 2026',
    excerpt: 'The ultimate Manali travel guide — best time, budget, packing list, top places and insider tips.',
    category:'Travel Guide',
    image:   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    author:  'Deepak Chauhan',
    date:    '2026-06-01',
    readTime:'15 min'
  },
  {
    slug:    'rohtang-pass-guide',
    title:   'Complete Rohtang Pass Guide 2026',
    excerpt: 'Everything you need to know before visiting Rohtang Pass — permits, best time and tips.',
    category:'Pass Guide',
    image:   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    author:  'Deepak Chauhan',
    date:    '2026-04-01',
    readTime:'7 min'
  },
  {
    slug:    'chandratal-lake-guide',
    title:   'Chandratal Lake — The Moon Lake of Spiti Valley',
    excerpt: 'Complete guide to Chandratal Lake — how to reach, best time, camping and permits.',
    category:'Lakes',
    image:   '/images/chandratal-1.jpeg',
    author:  'Deepak Chauhan',
    date:    '2026-05-01',
    readTime:'9 min'
  },
  {
    slug:    'manali_waterfalls',
    title:   'Best Waterfalls Near Manali',
    excerpt: 'Jogini, Rahala, Jana and Sajla — a complete waterfall guide to Manali.',
    category:'Nature',
    image:   '/images/Jogini Waterfall.jpg',
    author:  'Deepak Chauhan',
    date:    '2026-04-15',
    readTime:'6 min'
  },
  {
    slug:    'manali-traffic-june-2026',
    title:   'Manali Traffic Update June 2026',
    excerpt: 'Real-time road conditions, Atal Tunnel timings and tips to avoid peak-season traffic.',
    category:'Traffic Update',
    image:   'https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?w=600&q=80',
    author:  'Deepak Chauhan',
    date:    '2026-06-01',
    readTime:'5 min'
  }
];

/**
 * Returns blogs sorted by date descending.
 * Only returns blogs whose HTML file actually exists on disk.
 * @param {number} limit - max number of blogs to return (0 = all)
 */
function getLatestBlogs(limit = 0) {
  const existing = blogRegistry.filter(b => {
    const filePath = path.join(BLOGS_DIR, `${b.slug}.html`);
    return fs.existsSync(filePath);
  });

  // Sort newest first
  existing.sort((a, b) => new Date(b.date) - new Date(a.date));

  return limit > 0 ? existing.slice(0, limit) : existing;
}

module.exports = { getLatestBlogs };
