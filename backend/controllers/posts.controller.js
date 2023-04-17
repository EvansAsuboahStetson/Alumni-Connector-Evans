const postService = require("../services/post.service");
const Post = require("../models/post.model");

exports.findAllPost = (req, res) => {
  console.log(req.user)

  postService
    .findAll()
    .then((posts) => {
      const postIds = posts.map((post) => post._id);
      res.send(postIds);
    })
    .catch((err) =>
      res.status(500).json({ message: err.message || "Internal Server error" })
    );
};

exports.findCommentUpdateController = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Post content can not be empty",
    });
  }
  console.log(req.body);
  const data = {
    post_id: req.body.post_id,
    comments: req.body.comment,
    posted_by: req.user._id,
  };

  postService
    .findCommentUpdate(data)
    .then((datum) => {
      res.send(datum);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};
exports.createPost = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Post content can not be empty",
    });
  }
  const data = {
    user: req.user._id,
    text: req.body.text,
  };

  postService
    .create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};
// Function to find all events
// exports.findAllPost = (req, res) => {
//   postService.findAll().then((posts) => {
//       if (!posts) {
//         return res.status(404).send({
//           message: "Posts not found.",
//         });
//       }
//       console.log(posts)
//       res.send(posts);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Posts not found.",
//         });
//       }

//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving posts.",
//       });
//     });
// };

exports.PostReply = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Post content can not be empty",
    });
  }

  console.log(req.user,"req.user")
  const dataPost = {
    text: req.body.comment,
    user: req.user._id,
    name:req.user.name
  };

  const postId = req.body.post_id;
  const commentId = req.body.commentId

  postService
    .PostReplyId(postId, commentId, dataPost)
    .then((posts) => {
      if (!posts) {
        return res.status(404).send({
          message: "Post not found.",
        });
      }
      res.send(posts);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Posts not found.",
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
exports.findByID = (req, res) => {
  postService
    .findById()
    .then((posts) => {
      if (!posts) {
        return res.status(404).send({
          message: "Post not found.",
        });
      }
      res.send(posts);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Posts not found.",
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
