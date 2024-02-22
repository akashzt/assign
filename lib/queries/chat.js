const db = require("../../models/chat");
const constants = require("../../util/constants");
const logger = require('../../lib/logger'); 


createChat = async function (opts) {
  try {
    const chat = await db.create(opts);
    return chat;
  } catch (err) {
    logger.info(`Error in creating chat db query: ${err.message}`);
    throw new Error(`Error in creating chat`);
  }
};


getAllChat = async function (opts) {
    const grievance = await db.find({grievanceId:opts})
    .populate('senderId','email role')
    .populate('grievanceId','email role')
    .sort({ createdAt: -1 });;
    return grievance;
  };



module.exports = {
  createChat,
  getAllChat
};
