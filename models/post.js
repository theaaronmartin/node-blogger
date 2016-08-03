var posts = [
  { id: 1, title: 'Post 1', body: 'Post body 1' },
  { id: 2, title: 'Post 2', body: 'Post body 2' },
  { id: 3, title: 'Post 3', body: 'Post body 3' }
];

class Post {
  constructor(post) {
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;
  }

  save() {
    this.id = 4;
    console.log('Post saved!');
  }

  static all() {
    var all = [];

    for (var i = 0; i < posts.length; i++) {
        all.push(new Post(posts[i]));
    }

    return all;
  }

  static find(id) {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        return new Post(posts[i]);
      }
    }

    return null;
  }
}

module.exports = Post;
