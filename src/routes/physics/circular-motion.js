const express = require("express");
const circularMotionController = require("../../controllers/physics/circular-motion"); // Adjust the path as necessary
const { handleCalculationRequest  } = require("../../utils/calcUtils"); // Adjust the path as necessary
const circularMotionRouter = express.Router();

/**
 * @swagger
 * /physics/centripetal-acceleration:
 *   post:
 *     summary: Calculates centripetal acceleration (a_c = v^2 / r)
 *     description: Calculates the acceleration directed towards the center of a circular path using linear velocity and radius.
 *     tags:
 *          - Physics - Circular Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v:
 *                 type: number
 *                 description: Linear Velocity (e.g., m/s)
 *                 example: 10
 *               r:
 *                 type: number
 *                 description: Radius of the circular path (e.g., m). Cannot be zero.
 *                 example: 5
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 10)
 *                default: 10
 *                example: 2
 *             required:
 *               - v
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Centripetal acceleration (a_c) (e.g., m/s^2)
 *                   example: 20
 *                 equation:
 *                   type: string
 *                   example: "a_c = v^2 / r"
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
 *                   example: "Input 'v' must be a finite number."
 */
circularMotionRouter.post(
   "/centripetal-acceleration",
   handleCalculationRequest(circularMotionController.calculateCentripetalAcceleration)
);

/**
 * @swagger
 * /physics/centripetal-acceleration-angular:
 *   post:
 *     summary: Calculates centripetal acceleration (a_c = -ω^2 * r) using angular velocity
 *     description: Calculates the centripetal acceleration vector component using angular velocity and radius. The negative sign indicates direction towards the center.
 *     tags:
 *          - Physics - Circular Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               omega:
 *                 type: number
 *                 description: Angular velocity (ω) (e.g., rad/s)
 *                 example: 2
 *               r:
 *                 type: number
 *                 description: Radius (r) (e.g., m)
 *                 example: 5
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 10)
 *                default: 10
 *                example: 2
 *             required:
 *               - omega
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Centripetal acceleration (a_c) (e.g., m/s^2). Negative indicates towards center.
 *                   example: -20
 *                 equation:
 *                   type: string
 *                   example: "a_c = -ω^2 * r"
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
 *                   example: "Input 'omega' must be a finite number."
 */
circularMotionRouter.post(
   "/centripetal-acceleration-angular",
   handleCalculationRequest(circularMotionController.calculateCentripetalAccelerationAngular)
);

module.exports = circularMotionRouter;
