const db = require("../../models/grievance");
const constants = require("../../util/constants");
const logger = require('../../lib/logger'); 
const nodemailer=require('nodemailer');


createGrievance = async function (opts) {
  try {
    const grievance = await db.create(opts);
    return grievance;
  } catch (err) {
    logger.info(`Error in creating Grievance db query: ${err.message}`);
    throw new Error(`Error in creating Grievance`);
  }
};
findGrievance = async function (opts) {
  const grievance = await db.findById(opts);
  return grievance;
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

  sendEmail = async function (){
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'darwin54@ethereal.email',
          pass: 'ab2tKXXP9aZ9yyHa9M'
      }
  });
      // Setup email data
const mailOptions = {
  from: 'noreply@grievance.com',
  to: 'akashcse201620@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent from Node.js using nodemailer and SendGrid.',
  html: '<p>This is a test email sent from <b>Node.js</b> using <i>nodemailer</i> and <i>SendGrid</i>.</p>'
};
// Send email
console.log()
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    logger.info(`Error occurred while sending email:: ${err.message}`);
    throw new Error(`Error occurred while sending email:`);
  } else {
    return  info.response;
  }
});
  }

module.exports = {
  createGrievance,
  getMyGrievance,
  findGrievance,
  getAllGrievance,
  updateGrievance,
  sendEmail
};
