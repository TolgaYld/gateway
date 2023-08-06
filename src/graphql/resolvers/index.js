// Query Resolvers
const Query = require("./Queries/Query");
const User = require("./Queries/User");
const Post = require("./Queries/Post");
const Comment = require("./Queries/Comment");

//Mutation Resolvers
const Mutation = require("./Mutations/index");

//Subscription Resolvers
const Subscription = require("./Subscriptions/index");

module.exports = {
  Query,
  Mutation,
  User,
  Post,
  Comment,
  Subscription,
};
