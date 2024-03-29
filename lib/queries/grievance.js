const db = require("../../models/grievance");
const constants = require("../../util/constants");
const logger = require("../../lib/logger");
const nodemailer = require("nodemailer");

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

const getMyGrievance = async function (opts) {
  // Retrieve the grievances from the database based on the provided opts (presumably, the user ID).
  const grievances = await db.find({ userId: opts });

  if (!grievances || grievances.length === 0) {
    return null; // No grievances found for the user
  }

  const currentTime = new Date().getTime();
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  // Use map to iterate over each grievance and create a new object with the timeLeftInADay property
  const grievancesWithTimeLeft = grievances.map((grievance) => {
    // Create a new object to avoid modifying the original grievance object
    const newGrievance = grievance._doc;

    // Get the timestamp of the grievance
    const grievanceTimestamp = new Date(grievance.timestamp).getTime();

    // Calculate the time difference between the current timestamp and the grievance timestamp
    const timeDifference = currentTime - grievanceTimestamp;

    // Determine how much time is left within a day (24 hours)
    const timeLeftInADay =
      millisecondsInADay - (timeDifference % millisecondsInADay);

    // Convert timeLeftInADay to hours and minutes
    const hoursLeft = Math.floor(timeLeftInADay / (60 * 60 * 1000));
    const minutesLeft = Math.floor(
      (timeLeftInADay % (60 * 60 * 1000)) / (60 * 1000)
    );

    // Construct the timeLeftInADay string
    let timeLeftString = "";
    if (hoursLeft > 0) {
      timeLeftString += `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`;
    }
    if (minutesLeft > 0) {
      if (timeLeftString !== "") {
        timeLeftString += " and ";
      }
      timeLeftString += `${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`;
    }
    if (timeLeftString === "") {
      timeLeftString = "Less than a minute";
    }

    // Add the timeLeftInADay property to the new grievance object as a string
    newGrievance.timeLeftToComplete = timeLeftString;

    return newGrievance;
  });

  return grievancesWithTimeLeft;
};

getAllGrievance = async function (opts) {
  const grievances = await db.find();
  if (!grievances || grievances.length === 0) {
    return null; // No grievances found for the user
  }

  const currentTime = new Date().getTime();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  // Sort the grievances by last created timestamp
  grievances.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  // Use map to iterate over each grievance and create a new object with the timeLeftInADay property
  const grievancesWithTimeLeft = grievances.map((grievance) => {
    // Create a new object to avoid modifying the original grievance object
    const newGrievance = grievance._doc;

    // Get the timestamp of the grievance
    const grievanceTimestamp = new Date(grievance.timestamp).getTime();

    // Calculate the time difference between the current timestamp and the grievance timestamp
    const timeDifference = currentTime - grievanceTimestamp;

    // Determine how much time is left within a day (24 hours)
    if (timeDifference >= millisecondsInADay) {
      newGrievance.timeLeftToComplete = "NO";

      return newGrievance;
    } else {
      const timeLeftInADay =
        millisecondsInADay - (timeDifference % millisecondsInADay);

      // Convert timeLeftInADay to hours and minutes
      const hoursLeft = Math.floor(timeLeftInADay / (60 * 60 * 1000));
      const minutesLeft = Math.floor(
        (timeLeftInADay % (60 * 60 * 1000)) / (60 * 1000)
      );

      // Construct the timeLeftInADay string
      let timeLeftString = "";
      if (hoursLeft > 0) {
        timeLeftString += `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`;
      }
      if (minutesLeft > 0) {
        if (timeLeftString !== "") {
          timeLeftString += " and ";
        }
        timeLeftString += `${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`;
      }
      if (timeLeftString === "") {
        timeLeftString = "Less than a minute";
      }

      // Add the timeLeftInADay property to the new grievance object as a string
      newGrievance.timeLeftToComplete = timeLeftString;

      return newGrievance;
    }
  });

  return grievancesWithTimeLeft;
};

updateGrievance = async function (id, status) {
  await db.findByIdAndUpdate(id, { status: status });
  const updatedGrievance = await db.findById(id);
  return updatedGrievance;
};

module.exports = {
  createGrievance,
  getMyGrievance,
  findGrievance,
  getAllGrievance,
  updateGrievance,
};
