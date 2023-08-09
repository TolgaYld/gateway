const getUserId = require("../../utils/getId");
const createError = require("http-errors");
const axios = require("axios");
const errorHandler = require("../../../errors/errorHandler");

const validatePasswordOptions = {
  minLength: 6,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 0,
  pointsPerRepeat: 0,
  pointsForContainingLower: 0,
  pointsForContainingUpper: 0,
  pointsForContainingNumber: 0,
  pointsForContainingSymbol: 0,
};

module.exports = {
  signUpUser: async (parent, args, { pubsub, req }) => {
    try {
      const response = await axios.post(process.env.AUTHSERVICE + "/create", {
        type: "signUpUser",
        data: {
          ...args.data,
          email_confirmed: false,
          is_admin: false,
        },
      });

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
  },

  signInUser: async (parent, { data: { email, password } }, { req }) => {
    try {
      const response = await axios.post(process.env.AUTHSERVICE + "/signIn", {
        type: "signInUser",
        data: {
          email,
          password,
        },
      });

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
  },

  deleteUser: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/update/" + args.id,
          {
            type: "updateUser",
            data: {
              isDeleted: args.isDeleted,
              last_update_from_user_id: id,
            },
            headers,
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

  deleteUserFromDb: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.delete(
          process.env.AUTHSERVICE + "/delete/" + args.id,
          {
            type: "DeleteUserFromDb",
          },
          headers,
        );

        if (response.data.success) {
          return "User: " + args.id + " deleted";
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

  updateUser: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/update/" + id,
          {
            type: "updateUser",
            data: {
              ...args.data,
              last_update_from_user_id: id,
            },
            headers,
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

  updateUserPassword: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      const headers = { Authorization: id };
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/updatePassword/" + id,
          {
            type: "updatePassword",
            data: {
              password: args.data.password,
              last_update_from_user_id: id,
            },
            headers,
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
