const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, trim: true, default : '' },
  body: { type: String, trim: true, default : '' },
  user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  comments: [{
    body: { type : String, default : '' },
    user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  createdAt: { type : Date, default : Date.now },
  updatedAt: Date
});

// Validations
PostSchema.path('title').required(true, 'Post title cannot be blank');
PostSchema.path('body').required(true, 'Post body cannot be blank');

// Custom Methods
PostSchema.methods.addComment = function(user, comment) {
  this.comments.push({
    user: user._id,
    body: comment.body
  });

  return this.save();
};

module.exports = mongoose.model('Post', PostSchema);
