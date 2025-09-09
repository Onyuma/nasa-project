const express = require("express");
const planetRouter = express.Router();

const { getAllPlanets, getPlanet } = require("./planets.controller");

planetRouter.route("/").get(getAllPlanets);
planetRouter.route("/:id").get(getPlanet);

module.exports = planetRouter;
