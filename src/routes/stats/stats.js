const express = require("express");
const statsRouter = express.Router();
const statsController = require("../../controllers/stats/stats"); // Adjust the path as necessary
const { handleCalculationRequest, validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /stats/hello-world:
 *   post:
 *     summary: Calculates work done (W = F * Δs * cos(θ))
 *     description: Calculates work done based on force, displacement, and the angle between them.
 *     tags:
 *          - Stats - Hello World
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
statsRouter.post("/hello-world", (req, res) => {
  
   res.status(200).json({ result: "hello world" });
});
// Don't forget to export the router
module.exports = statsRouter;
