require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Serve sitemap and robots with correct content-type (must be before catch-all routes)
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><a href="/">Go Home</a>');
});

app.listen(PORT, () => {
  console.log(`Manali Escape server running at http://localhost:${PORT}`);
});

module.exports = app;
