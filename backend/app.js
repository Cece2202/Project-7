const express = require('express');
const path = require('path');


const userRoutes = require('./routes/user')

const app = express();

app.use(express.json());

require('dotenv').config();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Static route to serve uploaded images
app.use('/media', express.static(path.join(__dirname, 'media')));

// Routes
app.use('/api/auth', userRoutes);
// app.use('/api/sauces', sauceRoutes);

module.exports = app;