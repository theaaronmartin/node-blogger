const express = require('express'),
      User = require('../models/user');

const router = express.Router();

router.post('/', function(req, res) {
  var user = new User(req.body);

  user.save()
    .then(function(user) {
      res.json(user);
    }).catch(function(err) {
      res.status(422).json(err);
    });
});

module.exports = router;
