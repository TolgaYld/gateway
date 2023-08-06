const getUserId = require("../../utils/getId");
const createError = require("http-errors");
const axios = require("axios");
const errorHandler = require("../../../errors/errorHandler");

module.exports = {
  createComment: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.post(
          process.env.COMMENTSERVICE + "/create",
          {
            type: "CreateComment",
            data: {
              ...args.data,
            },
          },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(400, error);
        throw Error(400, error);
      }
    }
  },

  updateComment: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.patch(
          process.env.COMMENTSERVICE + "/update/" + args.id,
          {
            type: "UpdateComment",
            data: {
              ...args.data,
              last_update_from_user_id: id,
            },
          },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(400, error);
        throw Error(400, error);
      }
    }
  },
  deleteCommentFromDb: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.delete(
          process.env.COMMENTSERVICE + "/delete/" + args.id,
          {
            type: "DeleteCommentFromDb",
          },
        );

        if (response.data.success) {
          return response.data.data;
        } else {
          errorHandler(response.status, response.data.msg);
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(400, error);
        throw Error(400, error);
      }
    }
  },
};
