const express = require("express");
const oscillationsWavesRouter = express.Router();
const ocillationsWavesController = require("../../controllers/physics/oscillations-waves"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary



/**
 * @swagger
 * /physics/spring-pe:
 *   post:
 *     summary: Calculates potential energy in a spring (PE = 0.5 * k * Δx^2)
 *     description: Calculates the elastic potential energy stored in an ideal spring.
 *     tags:
 *          - Physics - Oscillations and Waves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Spring constant (k)
 *               deltaX:
 *                 type: number
 *                 description: Displacement from equilibrium (Δx)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - deltaX
 *     responses:
 *       200:
 *         description: Successful calculation of spring potential energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Spring potential energy (PE)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative k).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
oscillationsWavesRouter.post("/spring-pe", handleCalculationRequest(ocillationsWavesController.calculateSpringPE));

/**
 * @swagger
 * /physics/sho-period:
 *   post:
 *     summary: Calculates period of a spring-mass SHO (T = 2π√(m/k))
 *     description: Calculates the period of oscillation for a simple harmonic oscillator consisting of a mass on a spring.
 *     tags:
 *          - Physics - Oscillations and Waves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               k:
 *                 type: number
 *                 description: Spring constant (k)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - k
 *     responses:
 *       200:
 *         description: Successful calculation of the period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Period (T)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, k is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
oscillationsWavesRouter.post("/sho-period", handleCalculationRequest(ocillationsWavesController.calculateSHOPeriod));
 
/**
 * @swagger
 * /physics/simple-pendulum-period:
 *   post:
 *     summary: Calculates period of a simple pendulum (T = 2π√(l/g))
 *     description: Calculates the period of oscillation for a simple pendulum at small angles.
 *     tags:
 *          - Physics - Oscillations and Waves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               l:
 *                 type: number
 *                 description: Length of the pendulum (l)
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - l
 *               - g
 *     responses:
 *       200:
 *         description: Successful calculation of the period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Period (T)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, g is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
oscillationsWavesRouter.post("/simple-pendulum-period", handleCalculationRequest(ocillationsWavesController.calculateSimplePendulumPeriod));

/**
 * @swagger
 * /physics/frequency:
 *   post:
 *     summary: Calculates frequency (f = 1/T)
 *     description: Calculates frequency from the period of oscillation.
 *     tags:
 *          - Physics - Oscillations and Waves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               T:
 *                 type: number
 *                 description: Period (T)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - T
 *     responses:
 *       200:
 *         description: Successful calculation of frequency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Frequency (f)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, Period is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
oscillationsWavesRouter.post("/frequency", handleCalculationRequest(ocillationsWavesController.calculateFrequency));

/**
 * @swagger
 * /physics/angular-frequency:
 *   post:
 *     summary: Calculates angular frequency (ω = 2πf)
 *     description: Calculates angular frequency from frequency.
 *     tags:
 *          - Physics - Oscillations and Waves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               f:
 *                 type: number
 *                 description: Frequency (f)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - f
 *     responses:
 *       200:
 *         description: Successful calculation of angular frequency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Angular frequency (ω)
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
oscillationsWavesRouter.post("/angular-frequency", handleCalculationRequest(ocillationsWavesController.calculateAngularFrequency));

// Don't forget to export the router
module.exports = oscillationsWavesRouter;
