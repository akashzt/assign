let Joi = require('joi');
const resp = require("../../lib/response");
const constants = require("../../util/constants");
const logger = require("../../lib/logger");
// validation schema for create grievance
const createGrievanceSchema = Joi.object({
    userId: Joi.string(),
    status: Joi.string().valid('open', 'in-progress', 'resolved').default('open'),
    details: Joi.string().required(),
    timestamps: Joi.date().default(Date.now())
});

// validation schema for update 
const updateGrievanceSchema = Joi.object({
    id:Joi.string().required(),
    status: Joi.string().valid('open', 'in-progress', 'resolved').required()
});

// Method to validate create grievance body
const createGrievance = function (req, res, next) {
  logger.info("Validating create grievance data");
  const validate = createGrievanceSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};

// Method to validate update grievance req body
const updateGrievance = function (req, res, next) {
  logger.info("Validating update grievance req body");
  const validate = updateGrievanceSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};


module.exports = {
    createGrievance,
    updateGrievance,
};
