const db = require("../../models/grievance");
const constants = require("../../util/constants");
const logger = require('../../lib/logger'); 


createGrievance = async function (opts) {
  try {
    const grievance = await db.create(opts);
    return grievance;
  } catch (err) {
    logger.info(`Error in creating Grievance db query: ${err.message}`);
    throw new Error(`Error in creating Grievance`);
  }
};

getMyGrievance = async function (opts) {
  const grievance = await db.find({userId:opts} );
  return grievance;
};

getAllGrievance = async function (opts) {
    const grievance = await db.find()
    //.populate('userId');
    return grievance;
  };

updateGrievance = async function (id, status) {
    await db.findByIdAndUpdate(id,{status:status});
    const updatedGrievance = (await db.findById(id));
    return updatedGrievance ;
  };

module.exports = {
  createGrievance,
  getMyGrievance,
  getAllGrievance,
  updateGrievance
};
