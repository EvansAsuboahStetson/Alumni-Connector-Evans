const jwt = require("jsonwebtoken");
const { constants } = require("./constants");
const { roles } = require("./enums/roles.enum");

const allowRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role) || req.user._id === req.params.userId)
      next();
    else
      res.status(403).json({ message: "You are not authorized to do this." });
  };
};

exports.verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).json({ message: "please provide a token" });
  else {
    jwt.verify(token.split(" ")[1], constants.jwt.tokenSecret, (err, value) => {
      if (err) {
        res.status(500).json({ message: "failed to authenticate token" });
        return;
      }
      req.user = value.data;
      next();
    });
  }
};

exports.allowAdmin = allowRoles([roles.ADMIN]);
exports.allowRoles = allowRoles;
