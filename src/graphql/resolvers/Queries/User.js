const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");

const User = {
  posts: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.POSTSERVICE + "/findAllPostsFromUser/" + parent.id,
        {
          type: "FindAllPostsFromUser",
        },
      );
      if (response.status < 400 && response.data.successfully) {
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

  comments: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.COMMENTSERVICE + "/findAllCommentsFromUser/" + parent.id,
        {
          type: "FindAllCommentsFromUser",
        },
      );
      if (response.status < 400 && response.data.successfully) {
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

  reports: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.REPORTSERVICE + "/findAllReportsFromUser/" + parent.id,
        {
          type: "FindAllReportsFromUser",
        },
      );
      if (response.status < 400 && response.data.successfully) {
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

module.exports = User;
