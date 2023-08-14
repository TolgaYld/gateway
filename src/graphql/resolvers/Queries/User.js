const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");
const getUserId = require("../../utils/getId");

const User = {
  posts: async (parent, args, { req }) => {
    const id = await getUserId(req);
    try {
      const headers = { Authorization: id };
      const response = await axios.get(
        process.env.POSTSERVICE + "/findAllPostsFromUser/" + parent.id,
        {
          type: "FindAllPostsFromUser",
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

  comments: async (parent, args, { req }) => {
    const id = await getUserId(req);
    try {
      const headers = { Authorization: id };
      const response = await axios.get(
        process.env.COMMENTSERVICE + "/findAllCommentsFromUser/" + parent.id,
        {
          type: "FindAllCommentsFromUser",
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

  reports: async (parent, args, { req }) => {
    const id = await getUserId(req);
    try {
      const headers = { Authorization: id };
      const response = await axios.get(
        process.env.REPORTSERVICE + "/findAllReportsFromUser/" + parent.id,
        {
          type: "FindAllReportsFromUser",
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
};

module.exports = User;
