const costData = {
  Manali: {
    budget:   { hotel: 800,  food: 400, transport: 300, activities: 500 },
    moderate: { hotel: 2500, food: 800, transport: 600, activities: 1200 },
    luxury:   { hotel: 7000, food: 2000, transport: 2000, activities: 3000 }
  },
  Shimla: {
    budget:   { hotel: 700,  food: 350, transport: 250, activities: 400 },
    moderate: { hotel: 2000, food: 700, transport: 500, activities: 1000 },
    luxury:   { hotel: 6000, food: 1800, transport: 1500, activities: 2500 }
  },
  'Spiti Valley': {
    budget:   { hotel: 600,  food: 300, transport: 500, activities: 600 },
    moderate: { hotel: 1800, food: 600, transport: 1000, activities: 1500 },
    luxury:   { hotel: 5000, food: 1500, transport: 3000, activities: 3500 }
  },
  Dharamshala: {
    budget:   { hotel: 700,  food: 350, transport: 200, activities: 400 },
    moderate: { hotel: 2200, food: 750, transport: 450, activities: 1000 },
    luxury:   { hotel: 6500, food: 1800, transport: 1500, activities: 2500 }
  },
  Kasol: {
    budget:   { hotel: 500,  food: 300, transport: 400, activities: 500 },
    moderate: { hotel: 1500, food: 600, transport: 700, activities: 1200 },
    luxury:   { hotel: 4000, food: 1400, transport: 2000, activities: 2500 }
  },
  'Bir Billing': {
    budget:   { hotel: 600,  food: 300, transport: 350, activities: 800 },
    moderate: { hotel: 1800, food: 600, transport: 600, activities: 2000 },
    luxury:   { hotel: 5000, food: 1500, transport: 1500, activities: 4000 }
  }
};

// POST /api/cost-estimate
const estimate = (req, res) => {
  const { destination, days, travelers, budget } = req.body;
  const tier = budget || 'moderate';
  const dest = costData[destination];

  if (!dest) {
    return res.status(400).json({ success: false, message: 'Destination not found in cost database.' });
  }

  const rates = dest[tier];
  const numDays = parseInt(days) || 3;
  const numTravelers = parseInt(travelers) || 1;

  const perPersonPerDay = rates.hotel + rates.food + rates.transport + rates.activities;
  const totalPerPerson  = perPersonPerDay * numDays;
  const grandTotal      = totalPerPerson * numTravelers;

  res.json({
    success: true,
    data: {
      destination,
      days: numDays,
      travelers: numTravelers,
      budget: tier,
      breakdown: {
        hotel:      rates.hotel * numDays,
        food:       rates.food * numDays,
        transport:  rates.transport * numDays,
        activities: rates.activities * numDays
      },
      perPersonTotal: totalPerPerson,
      grandTotal,
      currency: 'INR'
    }
  });
};

module.exports = { estimate };
