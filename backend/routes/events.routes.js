const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const eventsController = require("../controllers/events.controller");

// Retrieve all events
router.get("/events", middleware.verify, eventsController.findAll);

module.exports = router;
