const express = require("express");
const gravitationRouter = express.Router();
const gravitationController = require("../../controllers/physics/gravitation"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/universal-gravitation:
 *   post:
 *     summary: Calculates gravitational force (F = -Gm1m2/r^2)
 *     description: Calculates the attractive gravitational force between two point masses. Note- returns a negative value indicating attraction.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m1:
 *                 type: number
 *                 description: Mass 1 (m1)
 *               m2:
 *                 type: number
 *                 description: Mass 2 (m2)
 *               r:
 *                 type: number
 *                 description: Distance between masses (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m1
 *               - m2
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of gravitational force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Gravitational force (F)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/universal-gravitation", handleCalculationRequest(gravitationController.calculateUniversalGravitation));

/**
 * @swagger
 * /physics/gravitational-field:
 *   post:
 *     summary: Calculates gravitational field (g = -Gm/r^2)
 *     description: Calculates the gravitational field strength at a distance from a point mass. Note- returns a negative value indicating direction towards the mass.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               r:
 *                 type: number
 *                 description: Distance from mass (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of gravitational field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Gravitational field strength (g)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/gravitational-field", handleCalculationRequest(gravitationController.calculateGravitationalField));

/**
 * @swagger
 * /physics/gravitational-pe:
 *   post:
 *     summary: Calculates gravitational potential energy between two masses (PE = -Gm1m2/r)
 *     description: Calculates the gravitational potential energy of a system of two point masses.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m1:
 *                 type: number
 *                 description: Mass 1 (m1)
 *               m2:
 *                 type: number
 *                 description: Mass 2 (m2)
 *               r:
 *                 type: number
 *                 description: Distance between masses (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m1
 *               - m2
 *               - r
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
 *         description: Invalid input (e.g., non-finite numbers, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/gravitational-pe", handleCalculationRequest(gravitationController.calculateGravitationalPE));

/**
 * @swagger
 * /physics/gravitational-potential:
 *   post:
 *     summary: Calculates gravitational potential (V_g = -Gm/r)
 *     description: Calculates the gravitational potential at a distance from a point mass.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               r:
 *                 type: number
 *                 description: Distance from mass (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of gravitational potential.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Gravitational potential (V_g)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/gravitational-potential", handleCalculationRequest(gravitationController.calculateGravitationalPotential));

/**
 * @swagger
 * /physics/orbital-speed:
 *   post:
 *     summary: Calculates orbital speed (v = sqrt(Gm/r))
 *     description: Calculates the speed of an object in a circular orbit around a larger mass.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m:
 *                 type: number
 *                 description: Mass of the central body (m)
 *               r:
 *                 type: number
 *                 description: Orbital radius (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of orbital speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Orbital speed (v)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/orbital-speed", handleCalculationRequest(gravitationController.calculateOrbitalSpeed));

/**
 * @swagger
 * /physics/escape-speed:
 *   post:
 *     summary: Calculates escape speed (v = sqrt(2Gm/r))
 *     description: Calculates the minimum speed needed to escape the gravitational pull of a mass from a given distance.
 *     tags:
 *          - Physics - Gravitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               G:
 *                 type: number
 *                 description: Gravitational constant (G)
 *               m:
 *                 type: number
 *                 description: Mass of the central body (m)
 *               r:
 *                 type: number
 *                 description: Distance from mass (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - G
 *               - m
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of escape speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Escape speed (v)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, radius is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
gravitationRouter.post("/escape-speed", handleCalculationRequest(gravitationController.calculateEscapeSpeed));
// Don't forget to export the router
module.exports = gravitationRouter;
