const express = require("express");
const thermalRouter = express.Router();
const thermalController = require("../../controllers/physics/thermal"); // Adjust the path as necessary
const { handleCalculationRequest, validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

// Don't forget to export the router
module.exports = thermalRouter;
