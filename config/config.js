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
    secret_pw: process.env.MY_SECRET_KEY,
    secret_jwt: process.env.JWT_SECRET_KEY,
  },
};
