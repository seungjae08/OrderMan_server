require("dotenv").config();

module.exports = {
  development: {
    username: "orderman_db",
    password: "orderman1",
    database: "orderMan",
    host: "orderman-db.ckwpgboktlpi.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    logging: false,
  },
  secret: {
    secret_pw: "abc",
    secret_jwt: "abc",
  },
};
