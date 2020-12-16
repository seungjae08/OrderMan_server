const express = require("express");
// const https = require("https");
// const http = require("http");
// const fs = require("fs");

// 미들웨어
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bearerToken = require('express-bearer-token');

// 라우터
const totalInfoRouter = require("./routes/totalInfo");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const unknownRouter = require('./routes/unknown')
const managementRouter = require('./routes/management')
const mypageRouter = require('./routes/mypage')

const { secret } = require("./config/config");

const app = express();
const port = 8080;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bearerToken());

app.set("jwt-secret", secret.secret);

app.get("/", (req, res) => {
  res.status(200).send("success")
});
app.use("/totalinfo", totalInfoRouter);
app.use("/user", userRouter);
app.use("/unknown", unknownRouter);
app.use("/order", orderRouter);
app.use("/management", managementRouter);
app.use("/mypage", mypageRouter)
app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});
