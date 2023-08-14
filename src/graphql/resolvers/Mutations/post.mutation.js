const getUserId = require("../../utils/getId");
const createError = require("http-errors");
const axios = require("axios");
const errorHandler = require("../../../errors/errorHandler");
const { log } = require("../../../modules/logModule");

module.exports = {
  createPost: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.post(
          process.env.POSTSERVICE + "/create",
          {
            type: "CreatePost",
            data: {
              ...args.data,
            },
          },
          { headers },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(response.data.msg);
        }
      } catch (error) {
        errorHandler(error.response.status, error.response.data.msg);
        throw Error(error.response.data.msg);
      }
    }
  },

  updatePost: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.patch(
          process.env.POSTSERVICE + "/update/" + args.id,
          {
            type: "UpdatePost",
            data: {
              ...args.data,
              last_update_from_user_id: id,
            },
          },
          { headers },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(error.response.status, error.response.data.msg);
        throw Error(error.response.data.msg);
      }
    }
  },

  deletePostFromDb: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.delete(
          process.env.POSTSERVICE + "/delete/" + args.id,
          {
            type: "DeletePostFromDb",
          },
          { headers },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(error.response.status, error.response.data.msg);
        throw Error(error.response.data.msg);
      }
    }
  },
};
