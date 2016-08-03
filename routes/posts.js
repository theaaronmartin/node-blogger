const express = require('express'),
      Post = require('../models/post');

const router = express.Router();

router.post('/', function(req, res) {
  res.send('Save posts');
});

router.get('/', function(req, res) {
  res.send('Display all posts');
});

router.get('/:id', function(req, res) {
  var post = Post.find(req.params.id);

  res.json(post);
});


module.exports = router;
