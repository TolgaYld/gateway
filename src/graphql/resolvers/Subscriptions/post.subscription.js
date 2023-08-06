const { withFilter } = require("graphql-subscriptions");
module.exports = {
  post: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("post added");
      },
      (payload, variables) => {
        return variables.user_id
          ? String(payload.post.user_id) === variables.user_id
          : true;
      },
    ),
  },
};
