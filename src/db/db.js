let db = null;

if (process.env.NODE_ENV === "development") {
  db = {
    connectionString: process.env.MONGODBDEVELOPMENT,
    ENV: "DEVELOPMENT_ENV",
  };
  db = process.env.MONGODBDEVELOPMENT;
} else if (process.env.NODE_ENV === "production") {
  db = {
    connectionString: process.env.MONGODBPRODUCTION,
    ENV: "PRODUCTION_ENV",
  };
} else {
  db = { connectionString: process.env.MONGODBTEST, ENV: "TEST_ENV" };
}

module.exports = db;
