const express = require('express'),
      Post = require('../models/post');

const router = express.Router();

router.post('/', function(req, res) {
  var post = new Post(req.body);

  // Assign req.user._id to post.user
  post.user = req.user._id;

  post.save()
    .then(function(post) {
      // Respond with our newly created post
      res.json(post);
    }).catch(function(err) {
      // If there is an error (i.e. validation), return the error
      res.json(422, err);
    });
});

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    res.json(posts);
  });
});

router.get('/:id', function(req, res) {
  Post.findById(req.params.id)
      // Populate referenced user, but only grab the username
      .populate('user', 'username email')
      // Populate embedded documents referenced user, but only grab the usernames
      .populate('comments.user', 'username')
      // Execute the query and then handle the results in a callback
      .exec(function(err, post) {
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

// Embedded Document
router.post('/:postId/comments', function(req, res) {
  function onFind(err, post) {
    function onCommentAdded(post) {
      res.json(post);
    }

    function onError(err) {
      res.json(422, err);
    }

    post.addComment(req.user, req.body)
      .then(onCommentAdded)
      .catch(onError);
  }

  Post.findById(req.params.postId, onFind);
});

module.exports = router;
