const getUserId = require("../../utils/getId");
const validator = require("validator");
const createError = require("http-errors");
const axios = require("axios");
const errorHandler = require("../../../errors/errorHandler");

const tokenDuration = "3h";
const refreshTokenDuration = "30d";

module.exports = {
  signUpUser: async (parent, args, { pubsub, req }) => {
    const isEmail = validator.isEmail(args.data.email);
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

    const isStrongPassword = validator.isStrongPassword(
      args.data.password,
      validatePasswordOptions,
    );

    if (!isEmail || !isStrongPassword) {
      if (!isEmail) {
        throw Error(createError(406, req.t("not-valid-email")));
      }
      if (!isStrongPassword) {
        throw Error(createError(406, req.t("pw-at-least-character")));
      }
    } else {
      try {
        const response = await axios.post(process.env.AUTHSERVICE + "/create", {
          type: "signUpUser",
          data: {
            ...args.data,
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
    }
  },

  signInUser: async (parent, { data: { email, password } }, { req }) => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw Error(createError(406, req.t("not-valid-email")));
    } else {
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
    }
  },

  deleteUser: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/update/" + args.id,
          {
            type: "updateUser",
            data: {
              isDeleted: args.isDeleted,
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

  deleteUserFromDb: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.delete(
          process.env.AUTHSERVICE + "/delete/" + args.id,
          {
            type: "DeleteUserFromDb",
          },
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
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/update/" + id,
          {
            type: "updateUser",
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
  updateUserPassword: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.patch(
          process.env.AUTHSERVICE + "/updatePassword/" + id,
          {
            type: "updatePassword",
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
};
