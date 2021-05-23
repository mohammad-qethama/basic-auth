'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./auth/router.js');
const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');

// Prepare the express app
const app = express();
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

app.use(authRoutes);

console.log('i am in between ')

app.use('*', error404);
app.use(error500);

module.exports = {
    server: app,
    start: (port) => {
      const PORT = port || 8080;
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
  };
  