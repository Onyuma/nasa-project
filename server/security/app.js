const helmet = require("helmet");
const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const { lowerCaseConverter } = require("./appp");
require("dotenv").config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function checkIsLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  if (!isLoggedIn) {
    res.status(401).json({
      msg: "You must login first",
    });
  }
  next();
}

function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}
passport.serializeUser((user, done) => {
  done(null, user._json);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
app.use(helmet());
app.set("view engine", "hbs");
app.use(
  cookieSession({
    name: "session",
    expires: new Date("2025, 10, 09"),
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["sessionkey"],
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/secure",
    session: true,
  }),
  (req, res) => {
    console.log("User", req.user);
    console.log("We were called back here by google...");
  }
);

app.get("/auth/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.render(path.join(__dirname, "public"), {
      message: "You have already logged out",
    });
  } else {
    req.logOut((err) => {
      if (err) {
        next(err);
      }
      return res.redirect("/");
    });
  }
});

app.get("/failure", (req, res) => {
  res.send("Login request failed");
});

app.get("/secure", checkIsLoggedIn, (req, res) => {
  res.send(
    `Dear ${lowerCaseConverter(req.user.family_name)} ${lowerCaseConverter(
      req.user.given_name
    )}, your secret number is ${req.user.sub}`
  );
});

app.use("/", express.static(path.join(__dirname, "public")));

module.exports = app;
