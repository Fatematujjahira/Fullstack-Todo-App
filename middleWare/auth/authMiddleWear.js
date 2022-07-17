/* dependencies */
const jwt = require("jsonwebtoken");

/* auth checker function */
async function authChecker(req, res, next) {
  try {
    if (req.signedCookies.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const verifiedId = await jwt.verify(token, process.env.JWT_SECRETE);
      req.email = verifiedId.email;
      if (req.url === "/login" || req.url === "/signup") {
        return res.redirect("/");
      }
      next();
    } else {
      // res.redirect(`/login`);
      if (req.url === "/signup") {
        return res.render(`auth/signup`, {
          email: null,
          emailErr: null,
          err: null,
          passErr: null,
        });
      }
      res.render(`auth/login`, {
        email: null,
        emailErr: null,
        err: null,
        passErr: null,
      });
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      if (req.url === "/signup") {
        return res.render(`auth/signup`, {
          email: null,
          emailErr: null,
          err: null,
          passErr: null,
        });
      }
      res.render(`auth/login`, {
        email: null,
        emailErr: null,
        err: null,
        passErr: null,
      });
      next(error);
    }
  }
}

module.exports = { authChecker };
