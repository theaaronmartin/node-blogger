const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, trim: true, default : '' },
  body: { type: String, trim: true, default : '' },
  comments: [{
    body: { type : String, default : '' },
    createdAt: { type : Date, default : Date.now }
  }],
  createdAt: { type : Date, default : Date.now },
  updatedAt: Date
});

// Validations
PostSchema.path('title').required(true, 'Post title cannot be blank');
PostSchema.path('body').required(true, 'Post body cannot be blank');

// Custom Methods
PostSchema.methods.addComment = function(comment) {
  this.comments.push({
    body: comment.body
  });

  return this.save();
};

module.exports = mongoose.model('Post', PostSchema);
