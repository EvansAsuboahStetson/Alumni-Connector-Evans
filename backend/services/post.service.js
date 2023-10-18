const Post = require("../models/post.model");
const User = require("../models/user.model");

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
exports.findCommentUpdate = async (data) => {
  const user = await User.findById(data.posted_by);
  const userName = user.name;
  const userProfilePic = user.profilePic;
  
  return Post.findByIdAndUpdate(
    data.post_id,
    {
      $push: {
        comments: {
          user: data.posted_by,
          name: userName,
          profilePic: userProfilePic,
          text: data.comments,
          date: new Date(),
        },
      },
    },
    { new: true }
  );
};

exports.PostReplyId = async (postId, commentId, dataPost) => {
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

exports.getLikes = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("likes", "name email")
      .exec();
    const likedUsers = post.likes;
    return likedUsers;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.PostLikeId = async (postId, userId) => {
  try {
    // Find the post you want to like
    const post = await Post.findById(postId);


    // Check if the user has already liked the post
    if (post.likes.includes(userId._id)) {
      console.log("Yes it is");
      // Remove the user's like from the post
      post.likes.pull(userId);
    } else {
      console.log("No it is not");
      // Add the user's like to the post
      post.likes.push(userId);
    }
    // Save the post to the database
    const updatedPost = await post.save();
    console.log(updatedPost);
    return updatedPost;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.findPostOfFriendsAndMutuals=async (user_id)=>{


  const userId = user_id; // Replace with your actual user ID

  // First, retrieve the list of your connected friends.
  const connectedFriends = await User.findById(userId).select("connectedFriends");
  
  // Then, retrieve the list of friends of your connected friends.
  const friendsOfFriends = await User.find({
    // You want to find users whose `_id` is in your `connectedFriends` list.
    _id: { $in: connectedFriends.connectedFriends },
    // You also want to find users who have at least one friend in your `connectedFriends` list.
    connectedFriends: { $in: connectedFriends.connectedFriends },
  }).select("_id");
  
  // Next, find all posts whose `user` field is in either your `connectedFriends` list or the `friendsOfFriends` list.
  const posts = await Post.find({
    $or: [
      // Find posts created by you.
      { user: userId },
      // Find posts created by your connected friends.
      { user: { $in: connectedFriends.connectedFriends } },
      // Find posts created by the connected friends of your connected friends.
      { user: { $in: friendsOfFriends.map((friend) => friend._id) } },
    ],
  })
  // Finally, use `populate()` to retrieve the `name` and `profilePic` fields from the `User` collection for each post's `user` field.
  .populate("user", "name profilePic headline").sort({ date: -1 });;
  
  return posts;
  


}
// Function to delete a post by id
exports.deleteById = (id) => {
  return Post.findByIdAndDelete(id);
};
