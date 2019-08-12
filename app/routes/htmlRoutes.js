const express = require('express');
const path = require('path');

const static = express.static(path.join(path.dirname(require.main.filename), 'app/public'));

module.exports = static;
