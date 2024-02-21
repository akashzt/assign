const constants = require("../util/constants");

function getErrorMessage(errCode) {
  let resMessage;
  switch (errCode) {
    case constants.response_code.JWT:
      resMessage = "Invalid Access Token!";
      break;

    case constants.response_code.INVALID_ID:
      resMessage = "Invalid user";
      break;

    case constants.response_code.UNAUTHORIZED:
      resMessage = "You are not authorized!";
      break;

    case constants.response_code.FORBIDDEN:
      resMessage = "This action is forbidden for you!";
      break;

    case constants.response_code.ROLE_BREACH:
      resMessage = "You are not authorize to perform this action!";
      break;

    case constants.response_code.NOT_FOUND:
      resMessage = "Data not found";
      break;

    case constants.response_code.EMPTY_REQ:
      resMessage = "Empty data set cannot be processed";
      break;

    default:
      resMessage = "Some unknown error occurred!";
      break;
  }
  return resMessage;
}

module.exports = {
  async sendResponse(resCode, resMessage, data, res, error = {}) {
    let err = null;
    if (resCode > constants.response_code.MAX_SUCCESS_CODE) {
      resMessage = resMessage || getErrorMessage(resCode);
      data = null;
      err = {
        message: error.message || resMessage
      };
      if (process.env.NODE_ENV !== "prod" && process.env.NODE_ENV !== "production")
        err.stackTrace = error.stack;
    }
    const responseJson = {
      "status": {
        "code": resCode,
        "message": resMessage
      },
      "data": data,
      error: err
    };
    if (resCode === 401 || resCode === 402) {
      res.status(resCode).json(responseJson);
    } else {
      res.json(responseJson);
    }
  }
};
