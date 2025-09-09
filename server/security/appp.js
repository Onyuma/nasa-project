const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const helmet = require("helmet");
const { Strategy } = require("passport-github2");
require("dotenv").config();

const config = {
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
};

passport.use(
  new Strategy(
    {
      callbackURL: "/auth/github/callback",
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      done(null, profile);
    }
  )
);

app.use(helmet());
app.use(passport.initialize());

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure",
    successRedirect: "/",
    session: false,
  })
);
app.get("/auth/failure", (req, res) => {
  res.status(404).send("Authentication failed...");
});
app.get("/auth/logout", (req, res) => {});

app.use(express.static(path.join(__dirname, "public")));

module.exports = { app };
