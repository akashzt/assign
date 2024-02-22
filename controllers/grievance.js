const logger = require("../lib/logger");
const resp = require("../lib/response");
const userQuery=require('../lib/queries/user')
const query = require("../lib/queries/grievance");
const chatQuery=require('../lib/queries/chat');
const constants = require("../util/constants");
const _ = require("lodash");
const io =require('../util/socketServer');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
    const emailSend=await sendEmail();
    console.log(emailSend)
    logger.info(`Query: responded with new grievance created: ${grievance}`);
    res.body = _.pick(grievance, grievanceFields);
    return resp.sendResponse(constants.response_code.SUCCESS, "New Grievance created and Email send to All HR", _.pick(grievance, grievanceFields), res);
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


const chatCreate = async function (req, res, next) {
  const user = req.user;
  const { grievanceId } = req.params;
  let body=req.body;
  body.grievanceId=grievanceId;
  body.senderId=user.id;
  
  try {
      let grievance = await query.findGrievance(grievanceId);
      // Only HR and the user who created the grievance can view the chat
      if (grievance.userId == user.id || user.role.toUpperCase() === 'HR') {
        let chat = await chatQuery.createChat(body);
        //const chatM=io.to(grievanceId).emit('chat message', body.message);
        //console.log(chatM)
        return resp.sendResponse(constants.response_code.SUCCESS,`Chats created for Grivence Id ${grievanceId}`, chat, res);
      } else {
          return resp.sendResponse(constants.response_code.UNAUTHORIZED, null, null, res);
      }
  } catch (err) {
      logger.info(`Error in chat created: ${err.message}`);
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
  }

};

const chatView = async function (req, res, next) {
  const user = req.user;
  const { grievanceId } = req.params;
  
  try {
      let grievance = await query.findGrievance(grievanceId);
      // Only HR and the user who created the grievance can view the chat
      if (grievance.userId == user.id || user.role.toUpperCase() === 'HR') {
          let allChat = await chatQuery.getAllChat(grievanceId);
          return resp.sendResponse(constants.response_code.SUCCESS, `All Chats for Grievance Id ${grievanceId}`, allChat, res);
      } else {
          return resp.sendResponse(constants.response_code.UNAUTHORIZED, null, null, res);
      }
  } catch (err) {
      logger.info(`Error in chat view: ${err.message}`);
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
  }
};
sendEmail = async function () {
  try {
      const transporter = nodemailer.createTransport({
          host: process.env.emailHost,
          port: process.env.emailPort,
          auth: {
              user: process.env.nodemailEmail,
              pass: process.env.nodemailPassword
          }
      });
      //send email to all HR
      const allHr=await userQuery.findHR();
      // Setup email data
      const mailOptions = {
          from: process.env.emailFrom,
          to: allHr,
          subject: 'Notification for create a new Grievance',
          text: 'New Grievance is created please resolve with In 24 hours.',
          html: '<b>New Grievance is created please resolve with In 24 hours. </b>'
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info.response;
  } catch (error) {
      console.error(`Error occurred while sending email: ${error.message}`);
      throw new Error(`Error occurred while sending email: ${error.message}`);
  }
}



module.exports = {
    createGrievance,
    getGrievance,
    updateGrievance,
    chatCreate,
    chatView
};