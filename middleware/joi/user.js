let Joi = require('joi');
const resp = require("../../lib/response");
const constants = require("../../util/constants");
const logger = require("../../lib/logger");
// validation schema for create user
const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(constants.Numbers.eight).max(constants.Numbers.twenty).required(),
    role: Joi.string().valid('employee', 'hr').default('employee'),
});

// validation schema for login user
const loginUserSchema = joi.object({
    email: joi.string().trim().required().email(),
    password: joi.string().trim().required(),
  });


// Method to validate create grievance body
const createUser = function (req, res, next) {
  logger.info("Validating create user data");
  const validate = createUserSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};
// Method to validate login user req body
const loginUser = function (req, res, next) {
    logger.info("Validating user login req body");
    const validate = loginUserSchema.validate(req.body);
    if (validate.error) {
      return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
    }
    return next();
  
  };

module.exports = {
    createUser,
    loginUser,
};
