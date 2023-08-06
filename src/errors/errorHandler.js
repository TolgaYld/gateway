const log = require("./logger");
const errorHandler = (statusCode, errorMessage) => {
  log.error(`Status Code: ${statusCode} / Error Message: ${errorMessage}`);
};

module.exports = errorHandler;
