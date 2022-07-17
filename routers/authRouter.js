const { Router } = require("express");
const {
  loginRoute,
  signupRoute,
  signupHandler,
  loginHandler,
  logoutHandler,
} = require("../controllers/auth/auth");
const { authChecker } = require("../middleWare/auth/authMiddleWear");

const authRouter = Router();

/* signup route */
authRouter.get("/signup", authChecker, signupRoute);

/* signup handler */
authRouter.post("/signup", signupHandler);

/* login route */
authRouter.get("/login", authChecker, loginRoute);

/* login handler */
authRouter.post("/login", loginHandler);

authRouter.get("/logout", logoutHandler);

module.exports = authRouter;
