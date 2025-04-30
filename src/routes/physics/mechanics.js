const express = require("express");
const mechanicsRouter = express.Router();
const mechanicsController = require("../../controllers/physics/mechanics"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Import the utility function

// === Router Entries with Swagger Docs ===

/**
 * @swagger
 * /physics/velocity:
 *   post:
 *     summary: Calculates velocity
 *     description: Calculates velocity based on displacement and time (v = Δs / Δt).
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaS:
 *                 type: number
 *                 description: Displacement (deltaS)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (deltaT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaS
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Velocity (v)
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
mechanicsRouter.post("/velocity", handleCalculationRequest(mechanicsController.calculateVelocity));

/**
 * @swagger
 * /physics/acceleration:
 *   post:
 *     summary: Calculates acceleration
 *     description: Calculates acceleration based on change in velocity and time (a = Δv / Δt).
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaV:
 *                 type: number
 *                 description: Change in velocity (deltaV)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (deltaT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaV
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of acceleration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Acceleration (a)
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
mechanicsRouter.post("/acceleration", handleCalculationRequest(mechanicsController.calculateAcceleration));

/**
 * @swagger
 * /physics/motion-v:
 *   post:
 *     summary: Calculates final velocity (v = v0 + at)
 *     description: Calculates final velocity using the first kinematic equation.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v0:
 *                 type: number
 *                 description: Initial velocity (v0)
 *               a:
 *                 type: number
 *                 description: Acceleration (a)
 *               t:
 *                 type: number
 *                 description: Time (t)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - v0
 *               - a
 *               - t
 *     responses:
 *       200:
 *         description: Successful calculation of final velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final velocity (v)
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
mechanicsRouter.post("/motion-v", handleCalculationRequest(mechanicsController.calculateMotionV));

/**
 * @swagger
 * /physics/motion-s:
 *   post:
 *     summary: Calculates final position (s = s0 + v0t + 0.5at^2)
 *     description: Calculates final position using the second kinematic equation.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               s0:
 *                 type: number
 *                 description: Initial position (s0)
 *               v0:
 *                 type: number
 *                 description: Initial velocity (v0)
 *               t:
 *                 type: number
 *                 description: Time (t)
 *               a:
 *                 type: number
 *                 description: Acceleration (a)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - s0
 *               - v0
 *               - t
 *               - a
 *     responses:
 *       200:
 *         description: Successful calculation of final position.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final position (s)
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
mechanicsRouter.post("/motion-s", handleCalculationRequest(mechanicsController.calculateMotionS));

/**
 * @swagger
 * /physics/motion-v2:
 *   post:
 *     summary: Calculates final velocity squared (v^2 = v0^2 + 2a(s - s0))
 *     description: Calculates final velocity squared using the third kinematic equation. Note- returns v^2, not v.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v0:
 *                 type: number
 *                 description: Initial velocity (v0)
 *               a:
 *                 type: number
 *                 description: Acceleration (a)
 *               s:
 *                 type: number
 *                 description: Final position (s)
 *               s0:
 *                 type: number
 *                 description: Initial position (s0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - v0
 *               - a
 *               - s
 *               - s0
 *     responses:
 *       200:
 *         description: Successful calculation of final velocity squared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final velocity squared (v^2)
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
mechanicsRouter.post("/motion-v2", handleCalculationRequest(mechanicsController.calculateMotionV2));

/**
 * @swagger
 * /physics/motion-v-avg:
 *   post:
 *     summary: Calculates average velocity (v_avg = 0.5 * (v + v0))
 *     description: Calculates average velocity assuming constant acceleration.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v:
 *                 type: number
 *                 description: Final velocity (v)
 *               v0:
 *                 type: number
 *                 description: Initial velocity (v0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - v
 *               - v0
 *     responses:
 *       200:
 *         description: Successful calculation of average velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Average velocity (v_avg)
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
mechanicsRouter.post("/motion-v-avg", handleCalculationRequest(mechanicsController.calculateMotionVAvg));

/**
 * @swagger
 * /physics/force:
 *   post:
 *     summary: Calculates force (F = ma)
 *     description: Calculates force using Newton's second law.
 *     tags:
 *          - Physics - Mechanics
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
 *               a:
 *                 type: number
 *                 description: Acceleration (a)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - a
 *     responses:
 *       200:
 *         description: Successful calculation of force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Force (F)
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
mechanicsRouter.post("/force", handleCalculationRequest(mechanicsController.calculateForce));

/**
 * @swagger
 * /physics/weight:
 *   post:
 *     summary: Calculates weight (W = mg)
 *     description: Calculates the force of gravity on an object.
 *     tags:
 *          - Physics - Mechanics
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
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - g
 *     responses:
 *       200:
 *         description: Successful calculation of weight.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Weight (W)
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
mechanicsRouter.post("/weight", handleCalculationRequest(mechanicsController.calculateWeight));

/**
 * @swagger
 * /physics/dry-friction-static-max:
 *   post:
 *     summary: Calculates maximum static friction (F_s = μ_s * N)
 *     description: Calculates the maximum possible static friction force.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               muS:
 *                 type: number
 *                 description: Coefficient of static friction (μ_s)
 *               N:
 *                 type: number
 *                 description: Normal force (N)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - muS
 *               - N
 *     responses:
 *       200:
 *         description: Successful calculation of maximum static friction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Maximum static friction (F_s_max)
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
mechanicsRouter.post("/dry-friction-static-max", handleCalculationRequest(mechanicsController.calculateDryFrictionStaticMax));

/**
 * @swagger
 * /physics/dry-friction-kinetic:
 *   post:
 *     summary: Calculates kinetic friction (F_k = μ_k * N)
 *     description: Calculates the kinetic friction force acting on a moving object.
 *     tags:
 *          - Physics - Mechanics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               muK:
 *                 type: number
 *                 description: Coefficient of kinetic friction (μ_k)
 *               N:
 *                 type: number
 *                 description: Normal force (N)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - muK
 *               - N
 *     responses:
 *       200:
 *         description: Successful calculation of kinetic friction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Kinetic friction (F_k)
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
mechanicsRouter.post("/dry-friction-kinetic", handleCalculationRequest(mechanicsController.calculateDryFrictionKinetic));

// Don't forget to export the router
module.exports = mechanicsRouter;
