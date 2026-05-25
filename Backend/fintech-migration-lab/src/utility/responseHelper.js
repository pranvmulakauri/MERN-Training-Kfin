/** NOT MIGRATED — students: convert to responseHelper.ts using ApiResponse<T> */

function sendSuccess(res, data, statusCode = 200) {
  res.status(statusCode).json({ success: true, data });
}

function sendError(res, message, statusCode = 400) {
  res.status(statusCode).json({ success: false, message });
}

function sendNotFound(res, resource) {
  sendError(res, `${resource} not found`, 404);
}

module.exports = { sendSuccess, sendError, sendNotFound };
