const eventService = require("../services/event.service");

// Function to find all events
exports.findAll = (req, res) => {eventService.findAllEvents().then((events) => {
      if (!events) {
        return res.status(404).send({
          message: "Events not found.",
        });
      }
      res.send(events);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Events not found.",
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
