const express = require('express'),
      Post = require('../models/post');

const router = express.Router();

router.post('/', function(req, res) {
  var post = new Post(req.body);
  post.save();

  res.json(post);
});

router.get('/', function(req, res) {
  var posts = Post.all();

  res.json(posts);
});

router.get('/:id', function(req, res) {
  var post = Post.find(req.params.id);

  res.json(post);
});


module.exports = router;
