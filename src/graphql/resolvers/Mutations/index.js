const user = require("./user.mutation");
const post = require("./post.mutation");
const comment = require("./comment.mutation");
const report = require("./report.mutation");

const Mutation = {
  ...user,
  ...post,
  ...comment,
  ...report,
};

module.exports = Mutation;
