const express = require("express");
// const https = require("https");
// const http = require("http");
// const fs = require("fs");

// 미들웨어
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// 라우터
const totalInfoRouter = require("./routes/totalInfo");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const unknownRouter = require('./routes/unknown')

const { secret } = require("./config/config");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: "TokenSecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: true,
//       sameSite: "none",
//       httpOnly: true,
//     },
//   })
// );

app.set("jwt-secret", secret.secret);

app.use("/totalinfo", totalInfoRouter);
app.use("/user", userRouter);
app.use("/unknown", unknownRouter);
app.use("/order", orderRouter);

app.listen(8000);
