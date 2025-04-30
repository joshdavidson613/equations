const express = require("express");
const relativityRouter = express.Router();
const nuclear = require("../../controllers/physics/nuclear"); // Adjust the path as necessary
const { handleCalculationRequest, validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/activity:
 *   post:
 *     summary: Calculates average activity in radioactive decay (A_avg = ΔN/Δt)
 *     description: Calculates the average activity (rate of decay) of a radioactive sample over a time interval. Note- Function uses `nValue` for number of nuclei ΔN and `tValue` for time Δt. This is a simplified average over Δt, instantaneous activity is dN/dt = -λN.
 *     tags:
 *          - Physics - Nuclear Physics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nValue:
 *                 type: number
 *                 description: Change in number of radioactive nuclei (ΔN)
 *               tValue:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - nValue
 *               - tValue
 *     responses:
 *       200:
 *         description: Successful calculation of average activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Average activity (A_avg)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, time is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
relativityRouter.post("/activity", handleCalculationRequest(nuclear.calculateActivity));

/**
 * @swagger
 * /physics/half-life:
 *   post:
 *     summary: Calculates remaining quantity after decay (N = N0 * (1/2)^(t/T_half))
 *     description: Calculates the remaining quantity of a substance after a time based on its half-life. Note- Uses `tValue` for time and `Thalf` for half-life.
 *     tags:
 *          - Physics - Nuclear Physics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               N0:
 *                 type: number
 *                 description: Initial quantity (N_0)
 *               tValue:
 *                 type: number
 *                 description: Elapsed time (t)
 *               Thalf:
 *                 type: number
 *                 description: Half-life (T_half)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - N0
 *               - tValue
 *               - Thalf
 *     responses:
 *       200:
 *         description: Successful calculation of remaining quantity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Remaining quantity (N)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, half-life is zero or negative).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
relativityRouter.post("/half-life", handleCalculationRequest(nuclear.calculateHalfLife));

/**
 * @swagger
 * /physics/absorbed-dose:
 *   post:
 *     summary: Calculates absorbed radiation dose (D = E/m)
 *     description: Calculates the absorbed dose of radiation based on the energy absorbed by a mass. Note- Uses `EValue` for energy and `mValue` for mass.
 *     tags:
 *          - Physics - Nuclear Physics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EValue:
 *                 type: number
 *                 description: Energy absorbed (E)
 *               mValue:
 *                 type: number
 *                 description: Mass (m)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - EValue
 *               - mValue
 *     responses:
 *       200:
 *         description: Successful calculation of absorbed dose.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Absorbed dose (D)
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
relativityRouter.post("/absorbed-dose", handleCalculationRequest(nuclear.calculateAbsorbedDose));

/**
 * @swagger
 * /physics/equivalent-dose:
 *   post:
 *     summary: Calculates equivalent radiation dose (H = wR * D)
 *     description: Calculates the equivalent dose, accounting for the biological effectiveness of different types of radiation. Note- Uses `DValue` for absorbed dose.
 *     tags:
 *          - Physics - Nuclear Physics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wR:
 *                 type: number
 *                 description: Radiation weighting factor (wR)
 *               DValue:
 *                 type: number
 *                 description: Absorbed dose (D)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - wR
 *               - DValue
 *     responses:
 *       200:
 *         description: Successful calculation of equivalent dose.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Equivalent dose (H)
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
relativityRouter.post("/equivalent-dose", handleCalculationRequest(nuclear.calculateEquivalentDose));

/**
 * @swagger
 * /physics/effective-dose:
 *   post:
 *     summary: Calculates effective radiation dose (E = wT * H)
 *     description: Calculates the effective dose, accounting for the sensitivity of different tissues/organs to radiation. Note- Uses `HValue` for equivalent dose.
 *     tags:
 *          - Physics - Nuclear Physics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wT:
 *                 type: number
 *                 description: Tissue weighting factor (wT)
 *               HValue:
 *                 type: number
 *                 description: Equivalent dose (H)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - wT
 *               - HValue
 *     responses:
 *       200:
 *         description: Successful calculation of effective dose.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Effective dose (E)
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
relativityRouter.post("/effective-dose", handleCalculationRequest(nuclear.calculateEffectiveDose));

// Don't forget to export the router
module.exports = relativityRouter;
