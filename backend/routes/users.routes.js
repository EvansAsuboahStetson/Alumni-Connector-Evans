const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const usersController = require("../controllers/users.controller");

// Retrieve all users
router.get(
  "/users",
  middleware.verify,
  middleware.allowAdmin,
  usersController.findAll
);
//admin to retrieve matches of users
router.post(
  "/users/:userId/matches",
  middleware.verify,
  middleware.allowAdmin,
  usersController.findMatches
);



router.patch(
  "/user/deleteRequest",
  middleware.verify,
  usersController.deleteFriendRequest
);



router.patch(
  "/user/acceptRequest",
  middleware.verify,
  usersController.acceptFriendRequest
);

router.post("/user/pending", middleware.verify, usersController.pending);

router.post("/user/sentRequest", middleware.verify, usersController.pendingSent)
///

router.post("/user/connectionexist", middleware.verify, usersController.isConnected);
router.get(
  "/user/pendingRequest",
  middleware.verify,
  usersController.CheckingPendingRequest
);

router.post("/user/connect", middleware.verify, usersController.connect);
router.post("/user/filter", middleware.verify, usersController.filter);

//user to retrieve their own matches
router.post("/user/matches", middleware.verify, usersController.findMatches);

// Retrieve user by userId
router.get(
  "/users/:userId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.findById
);

router.get(
  "/user/userId",
  middleware.verify,
  usersController.findById
);

// Update user by userId
router.patch(
  "/users/:userId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.update
);

// Delete user by userId
router.delete(
  "/users/:userId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.delete
);

// Create event of a user by userId
router.post(
  "/users/:userId/events",
  middleware.verify,
  middleware.allowAdmin,
  usersController.createUserEvent
);

// Retrieve all events of a user by userId
router.get(
  "/users/:userId/events",
  middleware.verify,
  middleware.allowAdmin,
  usersController.findUserEvents
);

// Retrieve event by eventId and userId
router.get(
  "/users/:userId/events/:eventId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.findUserEventById
);

router.post(
  "/user/follower/friends",
  middleware.verify,
  usersController.findFriends

)
router.post(
  "/user/follower/posts",
  middleware.verify,
  usersController.findUserEventByIdFollower

)

router.get(
 
  "/user/follower/events",
  middleware.verify,
  usersController.findFollowerEvents
);

// Update event by eventId and userId
router.patch(
  "/users/:userId/events/:eventId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.updateUserEvent
);

// Delete event by eventId and userId
router.delete(
  "/users/:userId/events/:eventId",
  middleware.verify,
  middleware.allowAdmin,
  usersController.deleteUserEvent
);

module.exports = router;
