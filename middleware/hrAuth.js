const jwt = require("jsonwebtoken");
const response = require("../lib/response");
const constants = require("../util/constants");

const adminAuthorization = (req, res, next) => {
  let {user}=req;
  if (user && user.role && (user.role).toUpperCase()==="HR") {
   
      return next();

  }
    return response.sendResponse(constants.response_code.UNAUTHORIZED, null, null, res);
  
};

module.exports = adminAuthorization;
