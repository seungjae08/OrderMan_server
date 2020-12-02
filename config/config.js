require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "orderMan",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  secret: {
    secret_pw: "abc",
    secret_jwt: "abc",
  },
};
