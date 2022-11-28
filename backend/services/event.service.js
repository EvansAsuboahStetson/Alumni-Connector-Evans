const Event = require("../models/event.model");

// Function to find all events by filter
const findEventByFilter = (filter) => {
  return Event.find(filter);
};

// Function to find all events
exports.findAllEvents = (user_Id) => {
  return findEventByFilter({});
};

// Function to find all events of a user by userId
exports.findUserEvents = (userId) => {
  return findEventByFilter({ createdBy: userId });
};

exports.findFollowerPost=(userId)=>{
  return findEventByFilter({createdBy: {$in: userId}})
}


exports.findFollowerEvents = (followerId)=>{
  return findEventByFilter ({createdBy: followerId})
}










// Function to find event by eventId
exports.findEventById = (eventId) => {
  return Event.findById(eventId);
};

// Function to create an event
exports.createEvent = (data) => {
  console.log(data);
  const event = new Event(data);

  // Save event in the database
  return event.save();
};

// Function to update an event by eventId
exports.updateEvent = (eventId, data) => {
  return Event.findByIdAndUpdate(eventId, data, { new: true });
};

// Function to delete an event by eventId
exports.deleteEvent = (eventId) => {
  return Event.findByIdAndDelete(eventId);
};
