const express = require('express'),
      logger = require('morgan'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      User = require('./models/user');

const app = express();

// Database
mongoose.connect('mongodb://localhost/node-blogger');

// Have Mongoose use the ES6's built in promises
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function() {
  console.log('Connected to node-blogger database.');
});

// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use(/^\/(?!users).*/, function(req, res, next) {
  if (!req.body.user) {
    next();
    return;
  }

  User.findOne({ username: req.body.user.username }, function(err, user) {
    // If user doesn't exist, respond with Unauthorized
    if (err || user === null) {
      res.status(401).send('You\'re not authorized');
      return;
    }
console.log(user);
    // Else add user to req.user and go to next route
    req.user = user;
    next();
  });
});

// Routes
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

// Run application
app.listen(3000, function() {
  console.log('Blogger is running!');
});
