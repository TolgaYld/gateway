const getUserId = require("../../utils/getId");
const createError = require("http-errors");
const errorHandler = require("../../../errors/errorHandler");
const axios = require("axios");

const Query = {
  //User Service
  user: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.AUTHSERVICE + "/find/" + id,
          {
            type: "FindUser",
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
    }
  },
  users: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(process.env.AUTHSERVICE + "/findAll", {
          type: "FindAllUsers",
        });
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
    }
  },

  //Post Service
  post: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.POSTSERVICE + "/find/" + args.id,
          {
            type: "FindPost",
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
    }
  },
  posts: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(process.env.POSTSERVICE + "/findAll", {
          type: "FindAllPosts",
        });
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
    }
  },

  //Comment Service
  comment: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.COMMENTSERVICE + "/find/" + args.id,
          {
            type: "FindComment",
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
    }
  },
  comments: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.COMMENTSERVICE + "/findAll",
          {
            type: "FindAllComments",
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
    }
  },

  //Report Service
  report: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.REPORTSERVICE + "/find/" + args.id,
          {
            type: "FindReport",
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
    }
  },
  reports: async (parent, args, { req }) => {
    const id = await getUserId(req);

    if (id == null) {
      throw Error(createError(401, req.t("unauthorized")));
    } else {
      try {
        const response = await axios.get(
          process.env.REPORTSERVICE + "/findAll",
          {
            type: "FindAllReports",
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
    }
  },
};

module.exports = Query;
