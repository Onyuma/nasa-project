const { planets } = require("../../models/planets.model");

function getAllPlanets(req, res) {
  const { state } = req.query;
  return res.status(200).json({
    msg: "success",
    status: "200",
    planets: state
      ? planets.filter((planet) => planet.state.toLowerCase() == state)
      : planets,
  });
}

function getPlanet(req, res) {
  const { id } = req.params;
  const filteredData = planets.filter(
    (planet) => planet.matricNumber.toLowerCase() == id
  );
  res.status(200).json({
    status: 200,
    data: filteredData[0],
  });
}

module.exports = {
  getAllPlanets,
  getPlanet,
};
