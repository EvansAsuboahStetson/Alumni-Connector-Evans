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

// Retrieve user by userId
router.get(
  "/users/:userId",
  middleware.verify,
  middleware.allowAdmin,
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
