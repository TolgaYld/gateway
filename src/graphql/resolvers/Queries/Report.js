const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");

const Report = {
  reported_by_user: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.AUTHSERVICE + "/find/" + parent.reported_by_user_id,
        {
          type: "FindUser",
        },
      );
      if (response.status < 400 && response.data.success) {
        return response.data.data;
      } else {
        errorHandler(response.status, response.data.msg);
        throw Error(createError(response.status, response.data.msg));
      }
    } catch (error) {
      errorHandler(400, error);
      throw Error(400, error);
    }
  },

  reported_user: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.AUTHSERVICE + "/find/" + parent.reported_user_id,
        {
          type: "FindUser",
        },
      );
      if (response.status < 400 && response.data.success) {
        return response.data.data;
      } else {
        errorHandler(response.status, response.data.msg);
        throw Error(createError(response.status, response.data.msg));
      }
    } catch (error) {
      errorHandler(400, error);
      throw Error(400, error);
    }
  },

  post: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.POSTSERVICE + "/find/" + parent.post_id,
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
      errorHandler(400, error);
      throw Error(400, error);
    }
  },
  comment: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.COMMENTSERVICE + "/find/" + parent.comment_id,
        {
          type: "FindComment",
        },
      );
      if (response.status < 400 && response.data.success) {
        return response.data.data;
      } else {
        errorHandler(response.status, response.data.msg);
        throw Error(createError(response.status, response.data.msg));
      }
    } catch (error) {
      errorHandler(400, error);
      throw Error(400, error);
    }
  },
};

module.exports = Report;
