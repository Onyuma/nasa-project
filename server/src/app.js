const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const planetRouter = require("./routes/planets/planets.router");
const { planets } = require("./models/planets.model");

app.use(morgan("combined"));
app.use(express.json());
app.use("/planets", planetRouter);

app.use(express.static(path.join(__dirname, "..", "public")));

module.exports = app;
