require("dotenv").config();

module.exports = {
  development: {
    username: "admin",
    password: "coinarticle",
    database: "orderMan",
    host: "coinarticle.cuegy4rvwmpq.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    logging: false,
  },
  secret: {
    secret_pw: "abc",
    secret_jwt: "abc",
  },
};
