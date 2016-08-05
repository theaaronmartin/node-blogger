const express = require('express'),
      User = require('../models/user');

const router = express.Router();

router.post('/', function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
      if (err) {
        res.json(422, err);
        return;
      }

      res.json(user);
    });
});

module.exports = router;
