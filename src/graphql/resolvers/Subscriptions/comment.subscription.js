const { withFilter } = require("graphql-subscriptions");
module.exports = {
  comment: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("comment added");
      },
      (payload, variables) => {
        return variables.user_id
          ? String(payload.comment.user_id) === variables.user_id
          : true;
      },
    ),
  },
};
