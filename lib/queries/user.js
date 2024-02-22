const db = require("../../models/user");
const constants = require("../../util/constants");
const logger = require('../../lib/logger'); 


createUser = async function (opts) {
  try {
    const user = await db.create(opts);
    return user;
  } catch (err) {
    logger.info(`Error in creating user db query: ${err.message}`);
    throw new Error(`Error in creating User`);
  }
};

findUser = async function (opts) {
  console.log(opts);
  const user = await db.findById( opts );
  return user;
};

findHR = async function () {
  const user = await db.find({role:"hr"} );
  const emails = users.map(user => user.email);
  return emails;
};

getUserByEmail = async function (email) {
  const user = (await db.findOne({ email: email  }).exec());
  return user;
};


module.exports = {
  createUser,
  findUser,
  getUserByEmail,
  findHR
};
