const { withFilter } = require("graphql-subscriptions");
module.exports = {
  report: {
    subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator("new report"),
  },
  reportedUser: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("new reported user");
      },
      (payload, variables) => {
        return variables.user_id
          ? String(payload.report.user_id) === variables.user_id
          : true;
      },
    ),
  },
  reportedFrom: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("new report from");
      },
      (payload, variables) => {
        return variables.user_id
          ? String(payload.report.user_id) === variables.user_id
          : true;
      },
    ),
  },
};
