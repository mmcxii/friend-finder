const express = require('express');
const path = require('path');

const friends = require('./app/routes/api/friends');
const pages = require('./app/routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Listen on Port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// HTML Routes
app.use(pages);

// API Routes
app.use('/api/friends', friends);
