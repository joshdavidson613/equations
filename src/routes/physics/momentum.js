const express = require("express");
const momentumRouter = express.Router();
const momentumController = require("../../controllers/physics/momentum"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/momentum:
 *   post:
 *     summary: Calculates momentum (p = mv)
 *     description: Calculates linear momentum of an object.
 *     tags:
 *          - Physics - Momentum
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
 *               v:
 *                 type: number
 *                 description: Velocity (v)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - v
 *     responses:
 *       200:
 *         description: Successful calculation of momentum.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Momentum (p)
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
momentumRouter.post("/momentum", handleCalculationRequest(momentumController.calculateMomentum));

/**
 * @swagger
 * /physics/impulse:
 *   post:
 *     summary: Calculates impulse (J = F * Δt)
 *     description: Calculates impulse from force and time interval.
 *     tags:
 *          - Physics - Momentum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Force (F)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of impulse.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Impulse (J)
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
momentumRouter.post("/impulse", handleCalculationRequest(momentumController.calculateImpulse));

/**
 * @swagger
 * /physics/impulse-momentum:
 *   post:
 *     summary: Validates impulse-momentum theorem (F * Δt = m * Δv)
 *     description: Checks if impulse equals change in momentum for given values. Returns boolean.
 *     tags:
 *          - Physics - Momentum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Force (F)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               deltaV:
 *                 type: number
 *                 description: Change in velocity (Δv)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaT
 *               - m
 *               - deltaV
 *     responses:
 *       200:
 *         description: Successful validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: True if impulse equals change in momentum within floating point tolerance.
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
momentumRouter.post("/impulse-momentum", handleCalculationRequest(momentumController.calculateImpulseMomentum));
// Don't forget to export the router
module.exports = momentumRouter;
