const express = require("express");
const solidMechanicsRouter = express.Router();
const solidMechanicsController = require("../../controllers/physics/solid-mechanics"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/youngs-modulus:
 *   post:
 *     summary: Calculates Young's Modulus (E = (F * L0) / (A * ΔL))
 *     description: Calculates Young's Modulus (elastic modulus) of a material under tensile or compressive stress.
 *     tags:
 *          - Physics - Solid Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Applied force (F)
 *               deltaL:
 *                 type: number
 *                 description: Change in length (ΔL)
 *               A:
 *                 type: number
 *                 description: Cross-sectional area (A)
 *               L0:
 *                 type: number
 *                 description: Original length (L0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaL
 *               - A
 *               - L0
 *     responses:
 *       200:
 *         description: Successful calculation of Young's Modulus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Young's Modulus (E)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, A or deltaL is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
solidMechanicsRouter.post("/youngs-modulus", handleCalculationRequest(solidMechanicsController.calculateYoungsModulus));

/**
 * @swagger
 * /physics/shear-modulus:
 *   post:
 *     summary: Calculates shear modulus (G = (F * y) / (A * Δx))
 *     description: Calculates the shear modulus (modulus of rigidity) of a material under shear stress.
 *     tags:
 *          - Physics - Solid Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Applied shear force (F)
 *               deltaX:
 *                 type: number
 *                 description: Transverse displacement (Δx)
 *               A:
 *                 type: number
 *                 description: Area parallel to the force (A)
 *               y:
 *                 type: number
 *                 description: Distance perpendicular to the force (y)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaX
 *               - A
 *               - y
 *     responses:
 *       200:
 *         description: Successful calculation of shear modulus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Shear modulus (G)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, A or deltaX is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
solidMechanicsRouter.post("/shear-modulus", handleCalculationRequest(solidMechanicsController.calculateShearModulus));

/**
 * @swagger
 * /physics/bulk-modulus:
 *   post:
 *     summary: Calculates bulk modulus (K = (F * V0) / (A * ΔV))
 *     description: Calculates the bulk modulus of a material under uniform pressure (hydrostatic stress).
 *     tags:
 *          - Physics - Solid Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Applied force causing pressure change (F)
 *               deltaV:
 *                 type: number
 *                 description: Change in volume (ΔV)
 *               A:
 *                 type: number
 *                 description: Surface area (A)
 *               V0:
 *                 type: number
 *                 description: Original volume (V0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaV
 *               - A
 *               - V0
 *     responses:
 *       200:
 *         description: Successful calculation of bulk modulus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Bulk modulus (K)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, A or deltaV is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
solidMechanicsRouter.post("/bulk-modulus", handleCalculationRequest(solidMechanicsController.calculateBulkModulus));

/**
 * @swagger
 * /physics/hookes-law:
 *   post:
 *     summary: Calculates force of a spring (F = -k * Δx)
 *     description: Calculates the restoring force exerted by an ideal spring according to Hooke's Law. Note - returns a negative value indicating the force opposes displacement.
 *     tags:
 *          - Physics - Solid Mechanics
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
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - deltaX
 *     responses:
 *       200:
 *         description: Successful calculation of spring force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Spring force (F)
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
solidMechanicsRouter.post("/hookes-law", handleCalculationRequest(solidMechanicsController.calculateHookesLaw));
// Don't forget to export the router
module.exports = solidMechanicsRouter;
