const User = require("../../models/User");
const hashStr = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = {};
/* sign up route */
auth.signupRoute = (req, res) => {
  try {
    res.render(`auth/signup`);
  } catch (error) {
    throw error;
  }
};

/* signup handler */
auth.signupHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password: await hashStr(password),
  });
  await user.save();
  res.render(`signupDone`);
};

/* login route */
auth.loginRoute = (req, res) => {
  try {
    res.render(`auth/login`, {
      email: null,
      emailErr: false,
      err: null,
      passErr: false,
    });
  } catch (error) {
    throw error;
  }
};

/* login handler */
auth.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = await jwt.sign(
          {
            email,
          },
          process.env.JWT_SECRETE,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("access_token", "Bearer " + token, {
          signed: true,
          secure: true,
          httpOnly: true,
        });
        res.redirect("/");
      } else {
        res.render(`auth/login`, {
          err: `wrong password`,
          passErr: true,
          email,
          emailErr: false,
        });
      }
    } else {
      res.render(`auth/login`, {
        email,
        emailErr: true,
        err: `user not found`,
        passErr: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

/* logout handler */
auth.logoutHandler = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.redirect("/login");
  } catch (error) {
    throw error;
  }
};

module.exports = auth;
