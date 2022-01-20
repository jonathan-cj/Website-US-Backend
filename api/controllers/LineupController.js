const logger = require("../../utils/Logger");
const services = require("../services/LineupServices");

module.exports = {
  async fetchBoysLineup(req, res) {
    try {
      const boysLineup = await services.getBoysLineup();

      res.status(200).send(boysLineup);
    } catch (e) {
      logger.log("error", e);
    }
  }
}
