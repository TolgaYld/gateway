const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");

const Post = {
  user: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.AUTHSERVICE + "/find/" + parent.user_id,
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

  comments: async (parent, args, { req }) => {
    try {
      const response = await axios.get(
        process.env.COMMENTSERVICE + "/findCommentsWithPostId/" + parent.id,
        {
          type: "FindCommentsWithPostId",
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

module.exports = Post;
