require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "orderMan",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  secret: {
    secret: process.env.MY_SECRET_KEY,
  },
};
