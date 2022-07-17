/* dependencies */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleWare/common/errorHandler");
const authRouter = require("./routers/authRouter");
const { authChecker } = require("./middleWare/auth/authMiddleWear");
const { todoRoute } = require("./routers/todo");
const indexController = require("./controllers/indexController");

/* initialize application */
const app = express();
app.set("view engine", "ejs");
dotenv.config();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRETE));
app.use(express.static("public"));

/* router */
app.use(authRouter);

/* todo route */
app.use(todoRoute);

/* home route */
app.get("/", authChecker, indexController);

/* not found handler */
app.use(notFoundHandler);

/* error handler */
app.use(errorHandler);
   
//DB connection
mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then(() =>
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running successfully");
    })
  )
  .catch((error) => console.log(error));


