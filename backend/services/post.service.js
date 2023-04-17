const Post = require("../models/post.model");

const findPostByFilter = (filter) => {
  return Post.find(filter);
};

// Function to find all posts
exports.findAll = () => {
  return findPostByFilter({});
};

// Function to find a post by id
exports.findById = (id) => {
  let loggedIn = req.user._id;

  return Post.findById(loggedIn);
};

// Function to create a post
exports.create = (data) => {
  const post = new Post(data);
  return post.save();
};

// Function to update a post by id
exports.updateById = (id, data) => {
  return Post.findByIdAndUpdate(id, data, { new: true });
};
exports.findCommentUpdate = (data) => {
  return Post.findByIdAndUpdate(
    data.post_id,
    {
      $push: {
        comments: {
          user: data.posted_by,
          text: data.comments,
          date: new Date(),
        },
      },
    },
    { new: true }
  );
};
exports.PostReplyId = async (postId, commentId, dataPost) => {
  console.log(postId, commentId, dataPost);
  try {
    // Find the post you want to reply to
    const post = await Post.findById(postId);

    // Find the comment you want to reply to
    const comment = post.comments.id(commentId);

    console.log(comment, "Found");

    // Add the new reply to the comment
    comment.replies.push(dataPost);

    // Save the post to the database
    const updatedPost = await post.save();
    console.log(updatedPost);
    return updatedPost;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to delete a post by id
exports.deleteById = (id) => {
  return Post.findByIdAndDelete(id);
};
