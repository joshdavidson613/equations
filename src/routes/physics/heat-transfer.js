const express = require("express");
const heatTransferRouter = express.Router();
const heatTransferController = require("../../controllers/physics/heat-transfer"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/thermal-conduction:
 *   post:
 *     summary: Calculates thermal conduction rate (Q/t = (kAΔT) / L)
 *     description: Calculates the rate of heat transfer by conduction through a material. Note- The function calculates Q, assuming a time interval is implied by the equation's usual use for rate. Documentation states Q, but the equation is typically for Q/t. Clarifying this difference. The function returns the result of the right side of the rate equation.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Thermal conductivity (k)
 *               A:
 *                 type: number
 *                 description: Cross-sectional area (A)
 *               deltaT:
 *                 type: number
 *                 description: Temperature difference across the material (ΔT)
 *               L:
 *                 type: number
 *                 description: Thickness of the material (L)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - A
 *               - deltaT
 *               - L
 *     responses:
 *       200:
 *         description: Successful calculation of heat transfer rate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Heat transfer rate (Q/t)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, thickness is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/thermal-conduction", handleCalculationRequest(thermalThermodynamicsController.calculateThermalConduction));

/**
 * @swagger
 * /physics/stefan-boltzmann-law:
 *   post:
 *     summary: Calculates thermal radiation power (P = εσA(T^4 - T0^4))
 *     description: Calculates the net rate of energy radiated by an object, considering its surroundings.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               epsilon:
 *                 type: number
 *                 description: Emissivity (ε)
 *               sigma:
 *                 type: number
 *                 description: Stefan-Boltzmann constant (σ)
 *               A:
 *                 type: number
 *                 description: Surface area (A)
 *               T:
 *                 type: number
 *                 description: Object temperature in Kelvin (T)
 *               T0:
 *                 type: number
 *                 description: Surrounding temperature in Kelvin (T0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - epsilon
 *               - sigma
 *               - A
 *               - T
 *               - T0
 *     responses:
 *       200:
 *         description: Successful calculation of radiated power.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Radiated power (P)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative temperatures for power calculation).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/stefan-boltzmann-law", handleCalculationRequest(thermalThermodynamicsController.calculateStefanBoltzmannLaw));

/**
 * @swagger
 * /physics/wien-law-lambda-max:
 *   post:
 *     summary: Calculates peak wavelength using Wien's Law (λ_max = b/T)
 *     description: Calculates the wavelength at which the emission spectrum of a black body is maximum.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               b:
 *                 type: number
 *                 description: Wien's displacement constant (b)
 *               T:
 *                 type: number
 *                 description: Temperature in Kelvin (T)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - b
 *               - T
 *     responses:
 *       200:
 *         description: Successful calculation of maximum wavelength.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Maximum wavelength (λ_max)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, temperature is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/wien-law-lambda-max", handleCalculationRequest(thermalThermodynamicsController.calculateWienLawLambdaMax));

/**
 * @swagger
 * /physics/wien-law-f-max:
 *   post:
 *     summary: Calculates peak frequency using Wien's Law (f_max = b' * T)
 *     description: Calculates the frequency at which the emission spectrum of a black body is maximum. Note- This version uses a modified Wien's constant b'.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bPrime:
 *                 type: number
 *                 description: Modified Wien's constant (b')
 *               T:
 *                 type: number
 *                 description: Temperature in Kelvin (T)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - bPrime
 *               - T
 *     responses:
 *       200:
 *         description: Successful calculation of peak frequency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Peak frequency (f_max)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/wien-law-f-max", handleCalculationRequest(thermalThermodynamicsController.calculateWienLawFMax));

// Don't forget to export the router
module.exports = heatTransferRouter;
