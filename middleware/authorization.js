const jwt = require("jsonwebtoken");
require('dotenv').config();
const response = require("../lib/response");
const constants = require("../util/constants");

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return response.sendResponse(constants.response_code.JWT, null, null, res, err);
      }
      req.user = decoded;
      return next();

    });
  } else {
    return response.sendResponse(constants.response_code.UNAUTHORIZED, null, null, res);
  }
};

module.exports = authorization;
