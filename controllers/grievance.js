const logger = require("../lib/logger");
const resp = require("../lib/response");
const query = require("../lib/queries/grievance");
const constants = require("../util/constants");
const _ = require("lodash");


const grievanceFields = ["_id", "userId","status","details","timestamp"];

const createGrievance = async function (req, res, next) {
  try {
    const user=req.user;
    console.log(user)
    if(user && user.role && (user.role).toLowerCase()==="employee"){
    logger.info("In create grievance controller");
    const body = req.body;
    body.userId=user.id;
    console.log(body)
    let grievance = await query.createGrievance(body);
    logger.info(`Query: responded with new grievance created: ${grievance}`);
    res.body = _.pick(grievance, grievanceFields);
    return resp.sendResponse(constants.response_code.SUCCESS, "New Grievance created", _.pick(grievance, grievanceFields), res);
    }else{
      return resp.sendResponse(constants.response_code.UNAUTHORIZED, null, null, res);
    }
  } catch (err) {
    logger.info(`Error in creating grievance: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const getGrievance = async function (req, res) {
  try {
    const user = req.user;
    if(user && user.role && (user.role).toUpperCase()==="HR"){
        let allGrievance = await query.getAllGrievance();
        return resp.sendResponse(constants.response_code.SUCCESS, "All Grievance",allGrievance, res);
    }
    let myGrievance = await query.getMyGrievance(user.id);
    return resp.sendResponse(constants.response_code.SUCCESS, "My Grievance",myGrievance, res);

  } catch (err) {
    logger.info(`Error in fetching grievance: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const updateGrievance = async function (req, res, next) {
  console.log(req.user)
  const { id, status } = req.query;
  try {
    let grievanceUpdated = await query.updateGrievance(id, status);
    return resp.sendResponse(constants.response_code.SUCCESS, "Grievance Updated", grievanceUpdated, res);
  } catch (err) {
    logger.info(`Error in updating user: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
  }
};



module.exports = {
    createGrievance,
    getGrievance,
    updateGrievance
};