const express = require("express");
const wavesOpticsRouter = express.Router();
const wavesOpticsController = require("../../controllers/physics/waves-optics"); // Adjust the path as necessary
const { handleCalculationRequest, validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/periodic-wave-velocity:
 *   post:
 *     summary: Calculates wave speed (v = fλ)
 *     description: Calculates the speed of a periodic wave based on its frequency and wavelength.
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               f:
 *                 type: number
 *                 description: Frequency (f)
 *               lambda:
 *                 type: number
 *                 description: Wavelength (λ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - f
 *               - lambda
 *     responses:
 *       200:
 *         description: Successful calculation of wave speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Wave speed (v)
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
wavesOpticsRouter.post("/periodic-wave-velocity", handleCalculationRequest(wavesOpticsController.calculatePeriodicWaveVelocity));

/**
 * @swagger
 * /physics/intensity:
 *   post:
 *     summary: Calculates intensity (I = P/A)
 *     description: Calculates the intensity of a wave (power per unit area).
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avgPower:
 *                 type: number
 *                 description: Average power (P)
 *               A:
 *                 type: number
 *                 description: Area (A)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - avgPower
 *               - A
 *     responses:
 *       200:
 *         description: Successful calculation of intensity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Intensity (I)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, area is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
wavesOpticsRouter.post("/intensity", handleCalculationRequest(wavesOpticsController.calculateIntensity));

/**
 * @swagger
 * /physics/intensity-level:
 *   post:
 *     summary: Calculates intensity level in decibels (L = 10 log10(I/I0))
 *     description: Calculates the intensity level (sound intensity level) relative to a reference intensity.
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               I:
 *                 type: number
 *                 description: Intensity (I)
 *               I0:
 *                 type: number
 *                 description: Reference intensity (I0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - I
 *               - I0
 *     responses:
 *       200:
 *         description: Successful calculation of intensity level.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Intensity level (L) in decibels (dB)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, I or I0 is non-positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
wavesOpticsRouter.post("/intensity-level", handleCalculationRequest(wavesOpticsController.calculateIntensityLevel));

/**
 * @swagger
 * /physics/pressure-level:
 *   post:
 *     summary: Calculates sound pressure level in decibels (L = 20 log10(ΔP/ΔP0))
 *     description: Calculates the sound pressure level relative to a reference pressure change.
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaP:
 *                 type: number
 *                 description: Pressure change (ΔP)
 *               deltaP0:
 *                 type: number
 *                 description: Reference pressure change (ΔP0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaP
 *               - deltaP0
 *     responses:
 *       200:
 *         description: Successful calculation of pressure level.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Pressure level (L) in decibels (dB)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, ΔP or ΔP0 is non-positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
wavesOpticsRouter.post("/pressure-level", handleCalculationRequest(wavesOpticsController.calculatePressureLevel));

/**
 * @swagger
 * /physics/doppler-effect:
 *   post:
 *     summary: Calculates Doppler effect velocity factor ((c + v_o) / (c - v_s))
 *     description: Calculates the velocity factor portion of the Doppler effect equation (f' = f * factor). Positive velocities for observer moving towards source, source moving towards observer.
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               c:
 *                 type: number
 *                 description: Speed of sound in the medium (c)
 *               vo:
 *                 type: number
 *                 description: Speed of observer (v_o)
 *               vs:
 *                 type: number
 *                 description: Speed of source (v_s)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - c
 *               - vo
 *               - vs
 *     responses:
 *       200:
 *         description: Successful calculation of Doppler velocity factor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Doppler velocity factor ((c + v_o) / (c - v_s))
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, speed of sound is zero, source speed equals speed of sound).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
wavesOpticsRouter.post("/doppler-effect", handleCalculationRequest(wavesOpticsController.calculateDopplerEffect));

/**
 * @swagger
 * /physics/mach-angle:
 *   post:
 *     summary: Calculates Mach angle (θ_M = arcsin(c/v))
 *     description: Calculates the angle of the Mach cone formed by an object moving faster than the speed of sound. Returns angle in radians.
 *     tags:
 *          - Physics - Waves and Optics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               c:
 *                 type: number
 *                 description: Speed of sound in the medium (c)
 *               v:
 *                 type: number
 *                 description: Speed of object (v)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - c
 *               - v
 *     responses:
 *       200:
 *         description: Successful calculation of Mach angle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Mach angle (θ_M) in radians
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, object speed less than or equal to speed of sound, speed of sound is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
wavesOpticsRouter.post("/mach-angle", handleCalculationRequest(wavesOpticsController.calculateMachAngle));

// Don't forget to export the router
module.exports = wavesOpticsRouter;
