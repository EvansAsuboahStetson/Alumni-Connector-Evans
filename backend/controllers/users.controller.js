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
exports.deleteFriendRequest = (req, res) => {
  let loggedIn = req.user._id;
  const user_remove = req.body.id
  console.log(user_remove,loggedIn)
  User.findByIdAndUpdate(loggedIn, {$pull: {pendingFriends :{$in:[user_remove]}} 
  })
    .then((users) =>{
      console.log(users,"dissss")
      res.send(users)
    
    })
    .catch((err) =>
     {
      console.log(err,"ppp")
      res.status(500).json({ message: err.message || "Internal Server error" })
});
};


exports.acceptFriendRequest = (req, res) => {
  let loggedIn = req.user._id;
  const user_add = req.body.id
  console.log(user_add,loggedIn) 
  User.findByIdAndUpdate(loggedIn, {$push: { connectedFriends: user_add} 
  })
    .then((users) =>{
      User.findByIdAndUpdate(user_add, {$push: { connectedFriends: loggedIn} 
      }).then((user)=>{
        res.send(user)
      })
    
    
    })
    .catch((err) =>
     {
      console.log(err,"ppp")
      res.status(500).json({ message: err.message || "Internal Server error" })
});
};


exports.CheckingPendingRequest = (req, res) => {
  let loggedIn = req.user._id;
  User.find({ _id: loggedIn})
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Could not send request" + user,
      });
    });
};











exports.pending = (req, res) => {
  let loggedIn = req.user._id;
  let user = req.body.id;

  //#id:user,
  //pendingFriends:{ $in: [loggedIn ] }

  User.find({ _id: loggedIn, pendingFriends: { $in: [user] } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Could not send request" + user,
      });
    });
};



exports.pendingSent = (req, res) => {
  let loggedIn = req.user._id;
  let user = req.body.id;

  //#id:user,
  //pendingFriends:{ $in: [loggedIn ] }
  console.log(loggedIn,"LOGGED IN")

  console.log(user,"USER")

  

  User.find({ _id: loggedIn, sentRequest: { $in: [user] } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Could not send request" + user,
      });
    });
};


exports.isConnected = (req, res) => {
  let loggedIn = req.user._id;
  let user = req.body.id;

  //#id:user,
  //pendingFriends:{ $in: [loggedIn ] }

  User.find({ _id: loggedIn, connectedFriends: { $in: [user] } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "User not found.",
        });
      }
      return res.status(500).send({
        message: "Could not send request" + user,
      });
    });
};






exports.connect = (req, res) => {
 
  let loggedIn = req.user._id;

  let user_Id = req.body.id;

  //pendingFriends: { $nin: [loggedIn] },
  let setTrue= false
 User.find({_id: user_Id, pendingFriends: { $in: [loggedIn] }}).then((user)=>{
  let friends= user[0]?.pendingFriends
  if (friends)
  {
    return res.status(200).send({
      message: "User already friend",
    });
  }
  else{
  
    User.findByIdAndUpdate(user_Id,  {
    
      $push: { pendingFriends: loggedIn },
    }).then((users) =>{
          User.findByIdAndUpdate(loggedIn, {$push: { sentRequest: user_Id} 
          }).then((user)=>{
            res.send(user)
          }).catch((error)=>{
            res.send(error)
          })
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
  }
 }).catch((error)=>{
  console.log(error)
 })



};

exports.filter = (req, res) => {

  const interests = req.body.interests;
  const major = req.body.major;
  const minor = req.body.minor;
  const id = req.user._id;
  const role = req.body.role.kindOfStand;



  var data = {};

  if (major == null && minor == null && interests.length == 0) {
  
    data = { role: { $ne: "admin" }, _id: { $ne: id } };
  } else if (major != null && minor != null && interests.length > 0) {

    data = {
      interests: { $all: interests },
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major != null && minor == null && interests.length == 0) {
    
    data = {
      major: major,
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major != null && minor != null && interests.length == 0) {
  
    data = {
      major: major,
      minor: minor,
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major == null && minor == null && interests.length > 0) {
    console.log("Major: Null, Minor: Null, Int>0");
    data = {
      interests: { $all: interests },
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major == null && minor != null && interests.length > 0) {
    console.log("Major: Null, Minor: Full, Int>0");
    data = {
      minor: minor,
      interests: { $all: interests },
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major == null && minor != null && interests.length == 0) {
    console.log("Major: Null, Minor: Full, Int==0");
    data = {
      minor: minor,
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  } else if (major != null && minor == null && interests.length > 0) {
    console.log("Major: Full, Minor: Null, Int>0");
    data = {
      major: major,
      interests: { $all: interests },
      _id: { $ne: id },
      role: { $ne: "admin" },
    };
  }

  if (role == "") {
  } else {
    console.log("I am not empty");
    var value = "";
    if (role == "student") {
      value = "alumni";
    } else {
      value = "student";
    }
    data["role"] = { $nin: ["admin", value] };
  }
  console.log(data);

  User.find(data)
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

//find the matches

exports.findMatches = (req, res) => {
  var userId = 0;
  var major = req.body.name;


  if (req.user.role == "admin") {
    userId = req.params.userId;
  } else {
    userId = req.user._id;
  }
  // const userId = req.params.userId;

  if (!req.body) {
    return res.status(400).send({
      message: "Search content can not be empty",
    });
  }
  User.find({
    name: { $regex: new RegExp(major, "i") },
    _id: { $ne: userId },
    role: { $ne: "admin" },
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
      minor: req.body.minor || undefined,
      interests: req.body.interests || undefined,
      profilePic: req.body.profilePic || undefined,
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


exports.findFollowerEvents = (req, res) => {
const user =  req.user._id
 User.find({ _id: user, connectedFriends: { $exists: true,$not:{$size:0} }}).then((use)=>{
  res.send(use)
 }).catch((error)=>{
  res.send(error)
 })
};
















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




exports.findUserEventByIdFollower = (req, res) => {
  const data = req.body.id
  eventService.findFollowerPost(data).then((event)=>{
    if(!event)
    {
      return res.status(404).send({
                message: "Event not found.",
              });
        
    }
    return res.send(event)

  })


  // eventService
  //   .findEventById(id)
  //   .then((event) => {
  //     if (!event) {
  //       return res.status(404).send({
  //         message: "Event not found.",
  //       });
  //     }

  //     if (event.createdBy.toString() !== req.params.userId) {
  //       return res.status(404).send({
  //         message: "Event not found.",
  //       });
  //     }

  //     res.send(event);
  //   })
  //   .catch((error) => {
  //     if (error.kind === "ObjectId") {
  //       return res.status(404).send({
  //         message: "Event not found.",
  //       });
  //     }
  //     return res.status(500).send({
  //       message:
  //         error.message ||
  //         "Error retrieving event with id " + req.params.eventId,
  //     });
  //   });
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
