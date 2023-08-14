const getUserId = require("../../utils/getId");
const createError = require("http-errors");
const axios = require("axios");
const errorHandler = require("../../../errors/errorHandler");

module.exports = {
  createReport: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.post(
          process.env.REPORTSERVICE + "/create",
          {
            type: "CreateReport",
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
          throw Error(createError(response.status, response.data.msg));
        }
      } catch (error) {
        errorHandler(error.response.status, error.response.data.msg);
        throw Error(error.response.data.msg);
      }
    }
  },
  updateReport: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.patch(
          process.env.REPORTSERVICE + "/update/" + args.id,
          {
            type: "UpdateReport",
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
};
