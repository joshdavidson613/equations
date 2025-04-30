const express = require("express");
const opticsRouter = express.Router();
const opticsController = require("../../controllers/physics/optics"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary 

/**
 * @swagger
 * /physics/cerenkov-angle:
 *   post:
 *     summary: Calculates Cherenkov angle (θ_C = arccos(c/nv_p))
 *     description: Calculates the angle of the Cherenkov cone formed by a charged particle moving faster than the speed of light in a medium. Returns angle in radians.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c)
 *               n:
 *                 type: number
 *                 description: Refractive index of the medium (n)
 *               vp:
 *                 type: number
 *                 description: Speed of particle (v_p)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - c
 *               - n
 *               - vp
 *     responses:
 *       200:
 *         description: Successful calculation of Cherenkov angle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Cherenkov angle (θ_C) in radians
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, particle speed in medium less than or equal to c/n, n or vp is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/cerenkov-angle", handleCalculationRequest(opticsController.calculateCerenkovAngle));

/**
 * @swagger
 * /physics/interference-fringes:
 *   post:
 *     summary: Calculates position of interference fringes (y_n = (nλL)/d)
 *     description: Calculates the position of the nth bright fringe in a Young's double-slit interference pattern.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lambda:
 *                 type: number
 *                 description: Wavelength (λ)
 *               d:
 *                 type: number
 *                 description: Slit separation (d)
 *               L:
 *                 type: number
 *                 description: Distance from slit to screen (L)
 *               n:
 *                 type: number
 *                 description: Fringe order (n = 0 for central max, ±1, ±2, ...)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - lambda
 *               - d
 *               - L
 *               - n
 *     responses:
 *       200:
 *         description: Successful calculation of fringe position.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Position of nth fringe (y_n)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, slit separation is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/interference-fringes", handleCalculationRequest(opticsController.calculateInterferenceFringes));

/**
 * @swagger
 * /physics/index-of-refraction:
 *   post:
 *     summary: Calculates index of refraction (n = c/v)
 *     description: Calculates the refractive index of a medium based on the speed of light in vacuum and in the medium.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c)
 *               v:
 *                 type: number
 *                 description: Speed of light in the medium (v)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - c
 *               - v
 *     responses:
 *       200:
 *         description: Successful calculation of index of refraction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Index of refraction (n)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, speed in medium is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/index-of-refraction", handleCalculationRequest(opticsController.calculateIndexofRefraction));

/**
 * @swagger
 * /physics/snells-law:
 *   post:
 *     summary: Validates Snell's Law (n1*sin(θ1) = n2*sin(θ2))
 *     description: Checks if Snell's Law holds for light passing between two media with given refractive indices and angles. Returns boolean. Angles should be in radians. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               n1:
 *                 type: number
 *                 description: Index of refraction of medium 1 (n1)
 *               theta1:
 *                 type: number
 *                 description: Angle of incidence in medium 1 in radians (θ1)
 *               n2:
 *                 type: number
 *                 description: Index of refraction of medium 2 (n2)
 *               theta2:
 *                 type: number
 *                 description: Angle of refraction in medium 2 in radians (θ2)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - n1
 *               - theta1
 *               - n2
 *               - theta2
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
 *                   description: True if Snell's law holds.
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
opticsRouter.post("/snells-law", handleCalculationRequest(opticsController.calculateSnellsLaw));

/**
 * @swagger
 * /physics/critical-angle:
 *   post:
 *     summary: Calculates critical angle (θ_c = arcsin(n2/n1))
 *     description: Calculates the critical angle for total internal reflection when light goes from a medium with index n1 to n2 (n1 > n2). Returns angle in radians.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               n1:
 *                 type: number
 *                 description: Index of refraction of medium 1 (n1)
 *               n2:
 *                 type: number
 *                 description: Index of refraction of medium 2 (n2)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - n1
 *               - n2
 *     responses:
 *       200:
 *         description: Successful calculation of critical angle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Critical angle (θ_c) in radians
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, n1 <= n2 resulting in invalid arcsin argument, n1 is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/critical-angle", handleCalculationRequest(opticsController.calculateCriticalAngle));

/**
 * @swagger
 * /physics/image-location:
 *   post:
 *     summary: Validates thin lens/mirror formula (1/f = 1/do + 1/di)
 *     description: Checks if the relationship between focal length, object distance, and image distance holds true. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               f:
 *                 type: number
 *                 description: Focal length (f)
 *               doValue:
 *                 type: number
 *                 description: Object distance (do)
 *               diValue:
 *                 type: number
 *                 description: Image distance (di)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - f
 *               - doValue
 *               - diValue
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
 *                   description: True if the lens/mirror formula holds.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, any of the inputs is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/image-location", handleCalculationRequest(opticsController.calculateImageLocation));

/**
 * @swagger
 * /physics/image-size:
 *   post:
 *     summary: Validates magnification formula (h'/h = -di/do) (Function uses h'/h = di/do)
 *     description: Checks if the relationship between object/image heights and distances holds true. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision. The function uses the magnitude relationship `h'/h = di/do` rather than the signed magnification formula. Documenting based on function implementation. Consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hiValue:
 *                 type: number
 *                 description: Image height (h')
 *               hoValue:
 *                 type: number
 *                 description: Object height (h)
 *               diValue:
 *                 type: number
 *                 description: Image distance (di)
 *               doValue:
 *                 type: number
 *                 description: Object distance (do)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - hiValue
 *               - hoValue
 *               - diValue
 *               - doValue
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
 *                   description: True if h'/h equals di/do.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, ho or do is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
opticsRouter.post("/image-size", handleCalculationRequest(opticsController.calculateImageSize));

/**
 * @swagger
 * /physics/spherical-mirror:
 *   post:
 *     summary: Calculates focal length of a spherical mirror (f = r/2)
 *     description: Calculates the focal length of a spherical mirror based on its radius of curvature.
 *     tags:
 *          - Physics - Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               r:
 *                 type: number
 *                 description: Radius of curvature (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of focal length.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Focal length (f)
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
opticsRouter.post("/spherical-mirror", handleCalculationRequest(opticsController.calculateSphericalMirror));
// Don't forget to export the router
module.exports = opticsRouter;
