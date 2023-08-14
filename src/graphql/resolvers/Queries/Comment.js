const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");
const getUserId = require("../../utils/getId");

const Comment = {
  user: async (parent, args, { req }) => {
    const id = await getUserId(req);
    try {
      const headers = { Authorization: id };
      const response = await axios.get(
        process.env.AUTHSERVICE + "/find/" + parent.user_id,
        {
          type: "FindUser",
          headers,
        },
      );
      if (response.status < 400 && response.data.success) {
        return response.data.data;
      } else {
        errorHandler(response.status, response.data.msg);
        throw Error(createError(response.status, response.data.msg));
      }
    } catch (error) {
      errorHandler(error.response.status, error.response.data.msg);
      throw Error(error.response.data.msg);
    }
  },

  post: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.POSTSERVICE + "/find/" + parent.post._id,
        {
          type: "FindPost",
        },
      );
      if (response.status < 400 && response.data.success) {
        return response.data.data;
      } else {
        errorHandler(response.status, response.data.msg);
        throw Error(createError(response.status, response.data.msg));
      }
    } catch (error) {
      errorHandler(error.response.status, error.response.data.msg);
      throw Error(error.response.data.msg);
    }
  },
};

module.exports = Comment;
