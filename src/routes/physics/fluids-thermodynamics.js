const express = require("express");
const fluidsThermodynamicsController = require("../../controllers/physics/fluids-thermodynamics.js");
const { handleCalculationRequest } = require("../../utils/calcUtils.js");
const fluidsThermodynamicsRouter = express.Router();

/**
 * @swagger
 * /physics/density:
 *   post:
 *     summary: Calculates density (ρ = m/V)
 *     description: Calculates density based on mass and volume.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
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
 *               V:
 *                 type: number
 *                 description: Volume (V)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - V
 *     responses:
 *       200:
 *         description: Successful calculation of density.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Density (ρ)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, Volume is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/density", handleCalculationRequest(fluidsThermodynamicsController.calculateDensity));

/**
 * @swagger
 * /physics/pressure:
 *   post:
 *     summary: Calculates pressure (P = F/A)
 *     description: Calculates pressure based on force applied over an area.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
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
 *               A:
 *                 type: number
 *                 description: Area (A)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - A
 *     responses:
 *       200:
 *         description: Successful calculation of pressure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Pressure (P)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, Area is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/pressure", handleCalculationRequest(fluidsThermodynamicsController.calculatePressure));

/**
 * @swagger
 * /physics/pressure-in-fluid:
 *   post:
 *     summary: Calculates pressure in a fluid (P = P0 + ρgh)
 *     description: Calculates the absolute pressure at a certain depth in a fluid.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               P0:
 *                 type: number
 *                 description: Atmospheric or surface pressure (P0)
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               h:
 *                 type: number
 *                 description: Depth (h)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - P0
 *               - rho
 *               - g
 *               - h
 *     responses:
 *       200:
 *         description: Successful calculation of pressure in fluid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Pressure (P)
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
fluidsThermodynamicsRouter.post("/pressure-in-fluid", handleCalculationRequest(fluidsThermodynamicsController.calculatePressureInFluid));

/**
 * @swagger
 * /physics/buoyancy:
 *   post:
 *     summary: Calculates buoyancy force (F_b = ρgV_displaced)
 *     description: Calculates the buoyant force exerted by a fluid on a submerged or partially submerged object (Archimedes' principle).
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               Vdisplaced:
 *                 type: number
 *                 description: Volume displaced by the object (V_displaced)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - rho
 *               - g
 *               - Vdisplaced
 *     responses:
 *       200:
 *         description: Successful calculation of buoyancy force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Buoyancy force (F_b)
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
fluidsThermodynamicsRouter.post("/buoyancy", handleCalculationRequest(fluidsThermodynamicsController.calculateBuoyancy));

/**
 * @swagger
 * /physics/mass-flow-rate:
 *   post:
 *     summary: Calculates mass flow rate (ṁ = Δm/Δt)
 *     description: Calculates the rate at which mass passes a point per unit time.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaM:
 *                 type: number
 *                 description: Change in mass (Δm)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaM
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of mass flow rate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Mass flow rate (ṁ)
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
fluidsThermodynamicsRouter.post("/mass-flow-rate", handleCalculationRequest(fluidsThermodynamicsController.calculateMassFlowRate));

/**
 * @swagger
 * /physics/volume-flow-rate:
 *   post:
 *     summary: Calculates volume flow rate (Q = ΔV/Δt)
 *     description: Calculates the rate at which volume passes a point per unit time.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaV1:
 *                 type: number
 *                 description: Change in volume (ΔV)
 *               deltaT1:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaV1
 *               - deltaT1
 *     responses:
 *       200:
 *         description: Successful calculation of volume flow rate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Volume flow rate (Q)
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
fluidsThermodynamicsRouter.post("/volume-flow-rate", handleCalculationRequest(fluidsThermodynamicsController.calculateVolumeFlowRate));

/**
 * @swagger
 * /physics/bernoulli-equation:
 *   post:
 *     summary: Checks Bernoulli's equation (P1 + ρgy1 + 0.5ρv1^2 = P2 + ρgy2 + 0.5ρv2^2)
 *     description: Validates if Bernoulli's equation holds true for the given fluid properties and conditions at two points. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               P1:
 *                 type: number
 *                 description: Pressure at point 1 (P1)
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               y1:
 *                 type: number
 *                 description: Height at point 1 (y1)
 *               v1:
 *                 type: number
 *                 description: Velocity at point 1 (v1)
 *               P2:
 *                 type: number
 *                 description: Pressure at point 2 (P2)
 *               y2:
 *                 type: number
 *                 description: Height at point 2 (y2)
 *               v2:
 *                 type: number
 *                 description: Velocity at point 2 (v2)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - P1
 *               - rho
 *               - g
 *               - y1
 *               - v1
 *               - P2
 *               - y2
 *               - v2
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
 *                   description: True if both sides of the equation are equal (may require floating-point tolerance).
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
fluidsThermodynamicsRouter.post("/bernoulli-equation", handleCalculationRequest(fluidsThermodynamicsController.calculateBernoulliEquation));

/**
 * @swagger
 * /physics/dynamic-viscosity:
 *   post:
 *     summary: Calculates dynamic viscosity (η = F * Δy / (A * Δvx))
 *     description: Calculates dynamic viscosity based on force, velocity gradient, and area. This formula is derived from shear stress/strain rate.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F:
 *                 type: number
 *                 description: Force tangential to the fluid layer (F)
 *               deltaVx:
 *                 type: number
 *                 description: Change in velocity between layers (Δvx)
 *               A:
 *                 type: number
 *                 description: Area of contact between layers (A)
 *               deltaY:
 *                 type: number
 *                 description: Distance between layers (Δy)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - deltaVx
 *               - A
 *               - deltaY
 *     responses:
 *       200:
 *         description: Successful calculation of dynamic viscosity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Dynamic viscosity (η)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, A or deltaVx is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/dynamic-viscosity", handleCalculationRequest(fluidsThermodynamicsController.calculateDynamicViscosity));

/**
 * @swagger
 * /physics/kinematic-viscosity:
 *   post:
 *     summary: Calculates kinematic viscosity (ν = η / ρ)
 *     description: Calculates kinematic viscosity from dynamic viscosity and density.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eta:
 *                 type: number
 *                 description: Dynamic viscosity (η)
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - eta
 *               - rho
 *     responses:
 *       200:
 *         description: Successful calculation of kinematic viscosity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Kinematic viscosity (ν)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, density is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/kinematic-viscosity", handleCalculationRequest(fluidsThermodynamicsController.calculateKinematicViscosity));

/**
 * @swagger
 * /physics/drag:
 *   post:
 *     summary: Calculates drag force (F_d = 0.5 * ρ * C_A * v^2)
 *     description: Calculates the drag force on an object moving through a fluid.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               CA:
 *                 type: number
 *                 description: Drag coefficient multiplied by reference area (C_A)
 *               v:
 *                 type: number
 *                 description: Velocity of the object relative to the fluid (v)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - rho
 *               - CA
 *               - v
 *     responses:
 *       200:
 *         description: Successful calculation of drag force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Drag force (F_d)
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
fluidsThermodynamicsRouter.post("/drag", handleCalculationRequest(fluidsThermodynamicsController.calculateDrag));

/**
 * @swagger
 * /physics/mach-number:
 *   post:
 *     summary: Calculates the Mach number (M = v/c)
 *     description: Calculates the Mach number, the ratio of an object's speed to the speed of sound in the medium.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v:
 *                 type: number
 *                 description: Velocity of the object (v)
 *               c:
 *                 type: number
 *                 description: Speed of sound in the medium (c)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of Mach number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Mach number (M)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, speed of sound is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/mach-number", handleCalculationRequest(fluidsThermodynamicsController.calculateMachNumber));

/**
 * @swagger
 * /physics/reynolds-number:
 *   post:
 *     summary: Calculates Reynolds number (Re = (ρ * v * D) / η)
 *     description: Calculates the Reynolds number, a dimensionless quantity used to predict flow patterns in different fluid flow situations.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rho:
 *                 type: number
 *                 description: Fluid density (ρ)
 *               v:
 *                 type: number
 *                 description: Fluid velocity (v)
 *               D:
 *                 type: number
 *                 description: Characteristic linear dimension (D)
 *               eta:
 *                 type: number
 *                 description: Dynamic viscosity of the fluid (η)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - rho
 *               - v
 *               - D
 *               - eta
 *     responses:
 *       200:
 *         description: Successful calculation of Reynolds number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Reynolds number (Re)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, viscosity is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/reynolds-number", handleCalculationRequest(fluidsThermodynamicsController.calculateReynoldsNumber));

/**
 * @swagger
 * /physics/froude-number:
 *   post:
 *     summary: Calculates Froude number (Fr = v / √(g * l))
 *     description: Calculates the Froude number, a dimensionless quantity used to indicate the influence of gravity on fluid motion.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v:
 *                 type: number
 *                 description: Velocity (v)
 *               g:
 *                 type: number
 *                 description: Acceleration due to gravity (g)
 *               l:
 *                 type: number
 *                 description: Characteristic length (l)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - v
 *               - g
 *               - l
 *     responses:
 *       200:
 *         description: Successful calculation of Froude number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Froude number (Fr)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, g or l is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/froude-number", handleCalculationRequest(fluidsThermodynamicsController.calculateFroudeNumber));

/**
 * @swagger
 * /physics/surface-tension:
 *   post:
 *     summary: Calculates surface tension (γ = F / l)
 *     description: Calculates the surface tension of a liquid based on force and length.
 *     tags:
 *          - Physics - Fluids and Thermodynamics
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
 *               l:
 *                 type: number
 *                 description: Length (l)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - F
 *               - l
 *     responses:
 *       200:
 *         description: Successful calculation of surface tension.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Surface tension (γ)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, length is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
fluidsThermodynamicsRouter.post("/surface-tension", handleCalculationRequest(fluidsThermodynamicsController.calculateSurfaceTension));

// Don't forget to export the router
module.exports = fluidsThermodynamicsRouter;
