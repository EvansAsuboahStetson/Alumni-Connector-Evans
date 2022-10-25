const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { constants } = require("../constants");

// Function to authenticate user
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) res.status(404).json({ message: "User not found" });
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) {
            res.status(500).json({ message: error.message || "Server error" });
          } else if (match) {
            const data = {
              email: user.email,
              _id: user._id,
              role: user.role,
            };
            const token = generateToken(data);
            res.status(200).json({ token, ...data });
          } else {
            res.status(403).json({ error: "passwords do not match" });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message || "Server error" });
    });
};

// Function to register user
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(422).json({
          message: "Email already exist, please choose a different one.",
        });
        return;
      }

      bcrypt.hash(req.body.password, constants.bcryptRounds, (error, hash) => {
        if (error) {
          res.status(500).json({ message: error.message || "Server error" });
          return;
        }

        const newUser = User({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          address: req.body.address,
        });
        newUser.save().then((user) => {
          const data = {
            email: user.email,
            _id: user._id,
            role: user.role,
          };
          const token = generateToken(data);
          res.status(200).json({ token, ...data });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message || "Server error" });
    });
};

// Function to test JWT
exports.testJwt = (req, res) => {
  res.status(200).json(req.user);
};

function generateToken(user) {
  return jwt.sign({ data: user }, constants.jwt.tokenSecret, {
    expiresIn: constants.jwt.expiresIn,
  });
}
