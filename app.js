const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const app = express();

// Database
mongoose.connect('mongodb://localhost/node-blogger');

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function() {
  console.log('Connected to node-blogger database.');
});

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/posts', require('./routes/posts'));

// Run application
app.listen(3000, function() {
  console.log('Blogger is running!');
});
