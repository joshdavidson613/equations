const express = require('express');
const combinatoricsRouter = express.Router();
const combinatoricsController = require('../controllers/combinatorics'); // Adjust the path as necessary
const { validateNumber } = require('../../utils/calcUtils'); // Adjust the path as necessary

/**
 * @swagger
 * tags:
 *   name: Combinatorics
 *   description: API endpoints for combinatorics calculations.
 */

/**
 * @swagger
 * /combinatorics/permut:
 *   get:
 *     summary: Calculate the number of permutations of k items from a set of n distinct items (without repetition).
 *     tags: [Combinatorics]
 *     parameters:
 *       - in: query
 *         name: n
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: true
 *         description: Total number of distinct items available (n). Must be a non-negative integer.
 *       - in: query
 *         name: k
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: true
 *         description: Number of items to choose (k). Must be a non-negative integer. Requires k <= n.
 *       - in: query
 *         name: digits
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 4
 *         required: false
 *         description: Number of decimal places for the result.
 *     responses:
 *       200:
 *         description: The number of permutations P(n, k). Returns 0 if k > n.
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               format: float
 *               example: 20
 *       400:
 *         description: Invalid input parameters (e.g., not finite numbers, not integers, k > n).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parameter 'n (total items)' must be a non-negative integer."
 *       500:
 *         description: Internal server error during calculation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
router.get('/permut', (req, res) => {
    try {
        // Extract and parse query parameters
        const n = parseInt(req.query.n, 10);
        const k = parseInt(req.query.k, 10);
        const digits = req.query.digits ? parseInt(req.query.digits, 10) : undefined; // Use undefined for default handling in controller

        // Validate parameters using the utility function
        validateNumber(n, "n (total items)", { checkNonNegative: true, checkInteger: true });
        validateNumber(k, "k (items to choose)", { checkNonNegative: true, checkInteger: true });
         if (digits !== undefined) {
             validateNumber(digits, "digits", { checkNonNegative: true, checkInteger: true });
         }

        // Controller function handles the k > n logic specifically
        const result = combinatoricsController.calculatePermut({ n, k, digits });

        res.json(result);
    } catch (error) {
        console.error("Error calculating permutations:", error.message);
        // Distinguish between bad user input and internal errors if possible
        if (error.message.includes("Parameter")) { // Check for validation errors
             res.status(400).json({ error: error.message });
        } else if (error.message.includes("cannot be greater than")) { // Check for k > n error message
             res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred during calculation." });
        }
    }
});

/**
 * @swagger
 * /combinatorics/permutationA:
 *   get:
 *     summary: Calculate the number of permutations of k items from a set of n distinct types, with repetition allowed.
 *     tags: [Combinatorics]
 *     parameters:
 *       - in: query
 *         name: n
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: true
 *         description: Number of distinct types available (n). Must be a non-negative integer.
 *       - in: query
 *         name: k
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: true
 *         description: Number of items to choose (k). Must be a non-negative integer.
 *       - in: query
 *         name: digits
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 4
 *         required: false
 *         description: Number of decimal places for the result.
 *     responses:
 *       200:
 *         description: The number of permutations with repetition n^k.
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               format: float
 *               example: 125
 *       400:
 *         description: Invalid input parameters (e.g., not finite numbers, not integers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parameter 'n (number of types)' must be a non-negative integer."
 *       500:
 *         description: Internal server error during calculation (e.g., result is too large).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
router.get('/permutationA', (req, res) => {
    try {
        // Extract and parse query parameters
        const n = parseInt(req.query.n, 10);
        const k = parseInt(req.query.k, 10);
         const digits = req.query.digits ? parseInt(req.query.digits, 10) : undefined; // Use undefined for default handling in controller

        // Validate parameters using the utility function
        validateNumber(n, "n (number of types)", { checkNonNegative: true, checkInteger: true });
        validateNumber(k, "k (items to choose)", { checkNonNegative: true, checkInteger: true });
         if (digits !== undefined) {
             validateNumber(digits, "digits", { checkNonNegative: true, checkInteger: true });
         }

        // Controller function performs the calculation
        const result = combinatoricsController.calculatePermutationA({ n, k, digits });

        res.json(result);
    } catch (error) {
        console.error("Error calculating permutations with repetition:", error.message);
        // Distinguish between bad user input and internal errors if possible
        if (error.message.includes("Parameter")) { // Check for validation errors
             res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred during calculation." });
        }
    }
});


module.exports = router;