const express = require('express'),
      Post = require('../models/post');

const router = express.Router();

router.post('/', function(req, res) {
  var post = new Post(req.body);

  post.save(function(err) {
    res.json(post);
  });
});

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    res.json(posts);
  });
});

router.get('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.json(post);
  });
});

router.patch('/:id', function(req, res) {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, post) {
    // respond with updated post
    res.json(post);
  });
});

router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err, post) {
    res.json(true);
  });
});

module.exports = router;
