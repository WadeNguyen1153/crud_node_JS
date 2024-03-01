// Import required modules
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8888;

// Connect to Database  
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public')); // Serve static files from 'public' directory

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

// Flash messages middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// EJS Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'));

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
