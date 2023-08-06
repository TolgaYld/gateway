const user = require("./user.subscription");
const post = require("./post.subscription");
const comment = require("./comment.subscription");
const reports = require("./report.subscription");

const Subscription = {
  ...user,
  ...post,
  ...comment,
  ...reports,
};

module.exports = Subscription;
