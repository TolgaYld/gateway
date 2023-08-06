require("dotenv").config();
const Fastify = require("fastify");
const mercurius = require("mercurius");
const path = require("path");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const { log } = require("./modules/logModule");
const port = parseInt(process.env.PORT) || 8001;

const { buildSchema, printSchema } = require("graphql");

const { loadSchemaSync, loadSchema } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");

const resolvers = require("./graphql/resolvers/index");

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "../locales/{{lng}}/translation.json",
    },
  });

const server = Fastify({
  logger: true,
  cors: true,
});

const schema = loadSchemaSync(
  path.join(__dirname, "./graphql/schema.graphql"),
  { loaders: [new GraphQLFileLoader()] },
);

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

server.register(mercurius, {
  schema: schemaWithResolvers,
  graphiql: true,
  subscription: true,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

server.register(i18nextMiddleware.plugin, { i18next });

module.exports = server;
