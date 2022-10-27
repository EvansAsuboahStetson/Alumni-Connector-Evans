const User = require("../models/user.model");
const eventService = require("../services/event.service");

// Function to find all users
exports.findAll = (req, res) => {
  User.find(null, { password: 0 })
    .then((users) => res.send(users))
    .catch((err) =>
      res.status(500).json({ message: err.message || "Internal Server error" })
    );
};

//find the matches

exports.findMatches = (req, res) => {
  console.log(req.user.role)
  var userId = 0

  if (req.user.role=="admin")
  {
    userId = req.params.userId
  }
  else{
    userId = req.user._id
  }
  // const userId = req.params.userId;

  
  if (!req.body) {
    return res.status(400).send({
      message: "Search content can not be empty",
    });
  }
  User.find({
    major: req.body.major,
    _id: { $ne: userId },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Function to find user by userId
exports.findById = (req, res) => {
  User.findById(req.params.userId, { password: 0 })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Function to update user by userId
exports.update = (req, res) => {
  // Validate if body is empty
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name || undefined,
      major: req.body.major || undefined,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Function to delete the user by userId
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};

// Function to create an event for a user by userId
exports.createUserEvent = (req, res) => {
  // Validate if body is empty
  if (!req.body) {
    return res.status(400).send({
      message: "Event content can not be empty",
    });
  }

  // Validate if event date is empty
  if (!req.body.date) {
    return res.status(400).send({
      message: "Event date can not be empty",
    });
  }

  // Create an event
  const data = {
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
    location: req.body.location,
    image: req.body.image,
    createdBy: req.params.userId,
  };

  eventService
    .createEvent(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};

// Function to find all events of a user by userId
exports.findUserEvents = (req, res) => {
  eventService
    .findUserEvents(req.params.userId)
    .then((events) => {
      if (!events) {
        return res.status(404).send({
          message: "Events not found.",
        });
      }
      res.send(events);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Events not found for user with ID " + req.params.userId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving events for user with id " + req.params.userId,
      });
    });
};

// Function to find user event by userId and eventId
exports.findUserEventById = (req, res) => {
  // Validate if event exist and belongs to user
  eventService
    .findEventById(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      if (event.createdBy.toString() !== req.params.userId) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      res.send(event);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found.",
        });
      }
      return res.status(500).send({
        message:
          error.message ||
          "Error retrieving event with id " + req.params.eventId,
      });
    });
};

// Update user event by userId and eventId
exports.updateUserEvent = (req, res) => {
  // Validate if event exist and belongs to user
  eventService
    .findEventById(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      if (event.createdBy.toString() !== req.params.userId) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      // Validate if body is empty
      if (!req.body) {
        return res.status(400).send({
          message: "Event content can not be empty",
        });
      }

      // Update event
      const data = {
        name: req.body.name || event.name,
        date: req.body.date || event.date,
        description: req.body.description || event.description,
        location: req.body.location || event.location,
        image: req.body.image || event.image,
      };

      eventService
        .updateEvent(req.params.eventId, data)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the event.",
          });
        });
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found.",
        });
      }
      return res.status(500).send({
        message:
          error.message ||
          "Error retrieving event with id " + req.params.eventId,
      });
    });
};

// Function to delete user event by userId and eventId
exports.deleteUserEvent = (req, res) => {
  // Validate if event exist and belongs to user
  eventService
    .findEventById(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      if (event.createdBy.toString() !== req.params.userId) {
        return res.status(404).send({
          message: "Event not found.",
        });
      }

      eventService
        .deleteEvent(req.params.eventId)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while deleting the event.",
          });
        });
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found.",
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with id " + req.params.eventId,
      });
    });
};
