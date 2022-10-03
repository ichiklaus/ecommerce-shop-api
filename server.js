'use strict';

const express = require('express');
const fs = require('fs');
// const { listeners } = require('process');
const app = express();
// To solve the cors issue
const cors = require('cors');
const bodyParser = require("body-parser");

// json file with the data
const data = fs.readFileSync('data.json');
const elements = JSON.parse(data);

app.use('/styles', express.static(process.cwd() + '/src/styles'));
app.use(express.static('public'));
app.use(cors(({ origin: '*' })));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/src/views/index.html');
});

// when get request is made, alldata() is called
app.route('/api/products').get(function alldata(request, response) {
  // Returns all information about the elements
  response.send(elements);
});

app.use(require('./src/routes/ecommerce-shop.routes'));

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }
});

// Listen on port set in environment variable or default to 4000
const listener = app.listen(process.env.PORT || 5000, function () {
  console.log(`Server up at http://127.0.0.1:${listener.address().port}`);
});
