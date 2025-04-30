const express = require("express");
const rotationalMotionRouter = express.Router();
const rationalMotionController = require("../../controllers/physics/rotational-motion"); // Adjust the path as necessary
const { handleCalculationRequest, validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/angular-velocity:
 *   post:
 *     summary: Calculates angular velocity (ω = Δθ / Δt)
 *     description: Calculates angular velocity based on change in angle and time.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaTheta:
 *                 type: number
 *                 description: Change in angle in radians (Δθ)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaTheta
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of angular velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Angular velocity (ω)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, deltaT is zero).
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
rotationalMotionRouter.post("/angular-velocity", handleCalculationRequest(rationalMotionController.calculateAngularVelocity));

/**
 * @swagger
 * /physics/angular-acceleration:
 *   post:
 *     summary: Calculates angular acceleration (α = Δω / Δt)
 *     description: Calculates angular acceleration based on change in angular velocity and time.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaOmega:
 *                 type: number
 *                 description: Change in angular velocity (Δω)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaOmega
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of angular acceleration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Angular acceleration (α)
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
rotationalMotionRouter.post("/angular-acceleration", handleCalculationRequest(rationalMotionController.calculateAngularAcceleration));

/**
 * @swagger
 * /physics/rotation-omega:
 *   post:
 *     summary: Calculates final angular velocity (ω = ω0 + αt)
 *     description: Calculates final angular velocity using rotational kinematic equation.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               omega0:
 *                 type: number
 *                 description: Initial angular velocity (ω0)
 *               alpha:
 *                 type: number
 *                 description: Angular acceleration (α)
 *               t:
 *                 type: number
 *                 description: Time (t)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - omega0
 *               - alpha
 *               - t
 *     responses:
 *       200:
 *         description: Successful calculation of final angular velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final angular velocity (ω)
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
rotationalMotionRouter.post("/rotation-omega", handleCalculationRequest(rationalMotionController.calculateRotationOmega));

/**
 * @swagger
 * /physics/rotation-theta:
 *   post:
 *     summary: Calculates angular position (θ = θ0 + ω0t + 0.5αt^2)
 *     description: Calculates final angular position using rotational kinematic equation.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theta0:
 *                 type: number
 *                 description: Initial angular position (θ0)
 *               omega0:
 *                 type: number
 *                 description: Initial angular velocity (ω0)
 *               t:
 *                 type: number
 *                 description: Time (t)
 *               alpha:
 *                 type: number
 *                 description: Angular acceleration (α)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - theta0
 *               - omega0
 *               - t
 *               - alpha
 *     responses:
 *       200:
 *         description: Successful calculation of final angular position.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final angular position (θ)
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
rotationalMotionRouter.post("/rotation-theta", handleCalculationRequest(rationalMotionController.calculateRotationTheta));

/**
 * @swagger
 * /physics/rotation-omega2:
 *   post:
 *     summary: Calculates angular velocity squared (ω^2 = ω0^2 + 2α(θ - θ0))
 *     description: Calculates final angular velocity squared using rotational kinematic equation. Note- returns ω^2, not ω.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               omega0:
 *                 type: number
 *                 description: Initial angular velocity (ω0)
 *               alpha:
 *                 type: number
 *                 description: Angular acceleration (α)
 *               theta:
 *                 type: number
 *                 description: Final angular position (θ)
 *               theta0:
 *                 type: number
 *                 description: Initial angular position (θ0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - omega0
 *               - alpha
 *               - theta
 *               - theta0
 *     responses:
 *       200:
 *         description: Successful calculation of angular velocity squared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Final angular velocity squared (ω^2)
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
rotationalMotionRouter.post("/rotation-omega2", handleCalculationRequest(rationalMotionController.calculateRotationOmega2));

/**
 * @swagger
 * /physics/rotation-omega-avg:
 *   post:
 *     summary: Calculates average angular velocity (ω_avg = 0.5 * (ω + ω0))
 *     description: Calculates average angular velocity assuming constant angular acceleration.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               omega:
 *                 type: number
 *                 description: Final angular velocity (ω)
 *               omega0:
 *                 type: number
 *                 description: Initial angular velocity (ω0)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - omega
 *               - omega0
 *     responses:
 *       200:
 *         description: Successful calculation of average angular velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Average angular velocity (ω_avg)
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
rotationalMotionRouter.post("/rotation-omega-avg", handleCalculationRequest(rationalMotionController.calculateRotationOmegaAvg));

/**
 * @swagger
 * /physics/torque:
 *   post:
 *     summary: Calculates torque (τ = rF sin(θ))
 *     description: Calculates torque based on radius, force, and the angle between them.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               r:
 *                 type: number
 *                 description: Radius (r)
 *               F:
 *                 type: number
 *                 description: Force (F)
 *               theta:
 *                 type: number
 *                 description: Angle between force and radius in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - r
 *               - F
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of torque.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Torque (τ)
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
rotationalMotionRouter.post("/torque", handleCalculationRequest(rationalMotionController.calculateTorque));

/**
 * @swagger
 * /physics/2nd-law-rotation:
 *   post:
 *     summary: Calculates torque using rotational 2nd Law (τ = Iα)
 *     description: Calculates torque based on moment of inertia and angular acceleration.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               I:
 *                 type: number
 *                 description: Moment of inertia (I)
 *               alpha:
 *                 type: number
 *                 description: Angular acceleration (α)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - I
 *               - alpha
 *     responses:
 *       200:
 *         description: Successful calculation of torque.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Torque (τ)
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
rotationalMotionRouter.post("/2nd-law-rotation", handleCalculationRequest(rationalMotionController.calculate2ndLawRotation));

/**
 * @swagger
 * /physics/moment-of-inertia:
 *   post:
 *     summary: Calculates moment of inertia for a point mass (I = mr^2)
 *     description: Calculates the moment of inertia for a single point mass relative to an axis.
 *     tags:
 *          - Physics - Rotational Motion
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
 *               r:
 *                 type: number
 *                 description: Distance from axis of rotation (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of moment of inertia.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Moment of inertia (I)
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
rotationalMotionRouter.post("/moment-of-inertia", handleCalculationRequest(rationalMotionController.calculateMomentOfInertia));

/**
 * @swagger
 * /physics/rotational-work:
 *   post:
 *     summary: Calculates rotational work (W = τΔθ)
 *     description: Calculates the work done by a constant torque over an angular displacement.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tau:
 *                 type: number
 *                 description: Torque (τ)
 *               deltaTheta:
 *                 type: number
 *                 description: Change in angular position in radians (Δθ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - tau
 *               - deltaTheta
 *     responses:
 *       200:
 *         description: Successful calculation of rotational work.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Rotational work (W)
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
rotationalMotionRouter.post("/rotational-work", handleCalculationRequest(rationalMotionController.calculateRotationalWork));

/**
 * @swagger
 * /physics/rotational-power:
 *   post:
 *     summary: Calculates rotational power (P = τω cos(θ))
 *     description: Calculates instantaneous rotational power based on torque, angular velocity, and the angle between them.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tau:
 *                 type: number
 *                 description: Torque (τ)
 *               omega:
 *                 type: number
 *                 description: Angular velocity (ω)
 *               theta:
 *                 type: number
 *                 description: Angle between torque and angular velocity in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - tau
 *               - omega
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of rotational power.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Rotational power (P)
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
rotationalMotionRouter.post("/rotational-power", handleCalculationRequest(rationalMotionController.calculateRotationalPower));

/**
 * @swagger
 * /physics/rotational-ke:
 *   post:
 *     summary: Calculates rotational kinetic energy (KE = 0.5Iω^2)
 *     description: Calculates the kinetic energy of a rotating object.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               I:
 *                 type: number
 *                 description: Moment of inertia (I)
 *               omega:
 *                 type: number
 *                 description: Angular velocity (ω)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - I
 *               - omega
 *     responses:
 *       200:
 *         description: Successful calculation of rotational kinetic energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Rotational kinetic energy (KE)
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
rotationalMotionRouter.post("/rotational-ke", handleCalculationRequest(rationalMotionController.calculateRotationalKE));

/**
 * @swagger
 * /physics/angular-momentum:
 *   post:
 *     summary: Calculates angular momentum (L = mrv sin(θ))
 *     description: Calculates angular momentum for a point mass moving relative to a point.
 *     tags:
 *          - Physics - Rotational Motion
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
 *               r:
 *                 type: number
 *                 description: Distance from the point/axis (r)
 *               v:
 *                 type: number
 *                 description: Linear velocity (v)
 *               theta:
 *                 type: number
 *                 description: Angle between radius vector and velocity vector in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - r
 *               - v
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of angular momentum.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Angular momentum (L)
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
rotationalMotionRouter.post("/angular-momentum", handleCalculationRequest(rationalMotionController.calculateAngularMomentum));

/**
 * @swagger
 * /physics/angular-impulse:
 *   post:
 *     summary: Calculates angular impulse (J = τΔt)
 *     description: Calculates angular impulse from torque and time interval.
 *     tags:
 *          - Physics - Rotational Motion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tau:
 *                 type: number
 *                 description: Torque (τ)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - tau
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of angular impulse.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Angular impulse (J)
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
rotationalMotionRouter.post("/angular-impulse", handleCalculationRequest(rationalMotionController.calculateAngularImpulse));
// Don't forget to export the router
module.exports = rotationalMotionRouter;
