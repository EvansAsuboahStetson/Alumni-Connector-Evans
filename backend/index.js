const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { constants } = require("./constants");
const authRoute = require("./routes/auth.routes");
const usersRoute = require("./routes/users.routes");
const eventsRoute = require("./routes/events.routes");
const postRoute = require("./routes/posts.routes")

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api", usersRoute);
app.use("/api", eventsRoute);
app.use("/api", postRoute);

mongoose.connect(constants.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("DB started successfully");
});

var http = require("http");

var httpServer = http.createServer(app);
httpServer.listen(8080);
