const express = require('express');
const router  = express.Router();

const homeController         = require('../controllers/homeController');
const destinationsController = require('../controllers/destinationsController');
const adventureController    = require('../controllers/adventureController');
const heritageController     = require('../controllers/heritageController');
const festivalsController    = require('../controllers/festivalsController');
const contactController      = require('../controllers/contactController');
const bookingController      = require('../controllers/bookingController');
const costController         = require('../controllers/costController');
const chatController         = require('../controllers/chatController');
const hotelController        = require('../controllers/hotelController');
const packagesController     = require('../controllers/packagesController');

// Pages
router.get('/',             homeController.index);
router.get('/destinations', destinationsController.index);
router.get('/adventure',    adventureController.index);
router.get('/heritage',     heritageController.index);
router.get('/festivals',    festivalsController.index);
router.get('/contact',      contactController.index);
router.get('/booking',      bookingController.index);
router.get('/hotels',       hotelController.index);
router.get('/packages',     packagesController.index);

// Data APIs
router.get('/api/destinations',  destinationsController.getAll);
router.get('/api/adventure',     adventureController.getAll);
router.get('/api/festivals',     festivalsController.getAll);
router.get('/api/hotels',        hotelController.getAll);
router.post('/api/hotels/book',  hotelController.book);
router.get('/api/packages',      packagesController.getAll);
router.post('/api/packages/book',packagesController.book);

// Booking APIs
router.post('/api/book',          bookingController.create);
router.get('/api/bookings',       bookingController.getAll);

// Cost estimate API
router.post('/api/cost-estimate', costController.estimate);

// Contact form
router.post('/contact', contactController.submit);

// AI Chat
router.post('/api/chat', chatController.chat);

module.exports = router;
