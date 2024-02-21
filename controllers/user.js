const logger = require("../lib/logger");
const resp = require("../lib/response");
const query = require("../lib/queries/user");
const constants = require("../util/constants");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("config");


const userProfileFields = ["_id", "email","role"];

const createUser = async function (req, res, next) {
  try {
    logger.info("In create User controller");
    const body = req.body;
    // do not allow duplicate emails in db
    if (body.email && !!(await query.getUserByEmail(body.email))) {
      return await resp.sendResponse(constants.response_code.DUPLICATE, "EmailId already exist!", null, res);
    }
    // encrypt user password and generate a userId
    body.password = await utils.genPasswordHash(body.password);
    let user = await query.createUser(body);
    logger.info(`Query: responded with new user created: ${user}`);
    const token = await genNewToken({
      email: user.email,
      id: user._id,
      name: user.name,
      role: user.role
    });
    res.set("Authorization", token);
   res.body = _.pick(user, userProfileFields);
   return resp.sendResponse(constants.response_code.SUCCESS, "Success", _.pick(user, userProfileFields), res);
  } catch (err) {
    logger.info(`Error in creating user: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    logger.info(`User Login Initiated for ${email}`);
    // check if account with email exists, if not throw an error
    const user = await query.getUserByEmail(email);
    if (!user) {
      return resp.sendResponse(constants.response_code.NOT_FOUND, "Account not exist, please create a new account or check the email", {}, res);
    }
    // check if password is correct
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return resp.sendResponse(constants.response_code.NOT_FOUND, "Incorrect password", {}, res);
    }

    const token = await genNewToken({
      email: user.email,
      id: user._id,
      role: user.role
    });
    console.log(token); 
    let pickedUser = _.pick(user, userProfileFields);
    res.set("Authorization", token);
    return resp.sendResponse(constants.response_code.SUCCESS, "Success", _.pick(user, userProfileFields), res);
  } catch (err) {
    logger.info(`Error in creating user: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const genNewToken = async function (payload, res) {
  try {
    const jwtOpts = config.get("jwt");
    return jwt.sign(payload, jwtOpts.secret, {
      expiresIn: jwtOpts.expires // expires in given time
    });
  } catch (err) {
    logger.info(`Error in generating token: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

module.exports = {
  createUser,
  loginUser
};