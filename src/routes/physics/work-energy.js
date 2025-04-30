const express = require("express");
const workEnergyRouter = express.Router();
const workEnergyController = require("../../controllers/physics/work-energy"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/work:
 *   post:
 *     summary: Calculates work done (W = F * Δs * cos(θ))
 *     description: Calculates work done based on force, displacement, and the angle between them.
 *     tags:
 *          - Physics - Work and Energy
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
 *               deltaS:
 *                 type: number
 *                 description: Displacement (deltaS)
 *               theta:
 *                 type: number
 *                 description: Angle between force and displacement in radians (theta)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaS
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of work done.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Work done (W)
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
workEnergyRouter.post("/work", handleCalculationRequest(workEnergyController.calculateWork));

/**
 * @swagger
 * /physics/kinetic-energy:
 *   post:
 *     summary: Calculates kinetic energy (KE = 0.5 * m * v^2)
 *     description: Calculates kinetic energy based on mass and velocity.
 *     tags:
 *          - Physics - Work and Energy
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
 *         description: Successful calculation of kinetic energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Kinetic energy (KE)
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
workEnergyRouter.post("/kinetic-energy", handleCalculationRequest(workEnergyController.calculateKineticEnergy));

/**
 * @swagger
 * /physics/kinetic-energy-from-momentum:
 *   post:
 *     summary: Calculates kinetic energy from momentum (KE = p^2 / (2m))
 *     description: Calculates kinetic energy based on momentum and mass.
 *     tags:
 *          - Physics - Work and Energy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p:
 *                 type: number
 *                 description: Momentum (p)
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - p
 *               - m
 *     responses:
 *       200:
 *         description: Successful calculation of kinetic energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Kinetic energy (KE)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, mass is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
workEnergyRouter.post(
   "/kinetic-energy-from-momentum",
   handleCalculationRequest(workEnergyController.calculateKineticEnergyFromMomentum)
);

/**
 * @swagger
 * /physics/gravitational-potential-energy:
 *   post:
 *     summary: Calculates gravitational potential energy (PE = mgh)
 *     description: Calculates the change in gravitational potential energy.
 *     tags:
 *          - Physics - Work and Energy
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
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               deltaH:
 *                 type: number
 *                 description: Change in height (Δh)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - g
 *               - deltaH
 *     responses:
 *       200:
 *         description: Successful calculation of gravitational potential energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Gravitational potential energy (PE)
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
workEnergyRouter.post(
   "/gravitational-potential-energy",
   handleCalculationRequest(workEnergyController.calculateGravitationalPotentialEnergy)
);

/**
 * @swagger
 * /physics/efficiency:
 *   post:
 *     summary: Calculates efficiency (η = W_out / W_in)
 *     description: Calculates the efficiency of a process or machine.
 *     tags:
 *          - Physics - Work and Energy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Wout:
 *                 type: number
 *                 description: Work output (W_out)
 *               Ein:
 *                 type: number
 *                 description: Work input (W_in)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - Wout
 *               - Ein
 *     responses:
 *       200:
 *         description: Successful calculation of efficiency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Efficiency (η)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, Ein is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
workEnergyRouter.post("/efficiency", handleCalculationRequest(workEnergyController.calculateEfficiency));

/**
 * @swagger
 * /physics/power:
 *   post:
 *     summary: Calculates power (P = ΔW / Δt)
 *     description: Calculates average power based on change in work and time.
 *     tags:
 *          - Physics - Work and Energy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaW:
 *                 type: number
 *                 description: Change in work (ΔW)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaW
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of power.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Power (P)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, deltaT is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
workEnergyRouter.post("/power", handleCalculationRequest(workEnergyController.calculatePower));

/**
 * @swagger
 * /physics/power-velocity:
 *   post:
 *     summary: Calculates power from force and velocity (P = Fv cos(θ))
 *     description: Calculates instantaneous power based on force, velocity, and the angle between them.
 *     tags:
 *          - Physics - Work and Energy
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
 *               v:
 *                 type: number
 *                 description: Velocity (v)
 *               theta:
 *                 type: number
 *                 description: Angle between force and velocity in radians (theta)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - v
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of power.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Power (P)
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
workEnergyRouter.post("/power-velocity", handleCalculationRequest(workEnergyController.calculatePowerVelocity));
// Don't forget to export the router
module.exports = workEnergyRouter;
