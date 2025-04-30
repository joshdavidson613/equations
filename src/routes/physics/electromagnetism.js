const express = require("express");
const electroMagnetismController = require("../../controllers/physics/electromagnetism");
const { handleCalculationRequest } = require("../../utils/calcUtils");    
const electromagnetismRouter = express.Router();

/**
 * @swagger
 * /physics/coulombs-law:
 *   post:
 *     summary: Calculates electric force using Coulomb's Law (F = k * q1*q2 / r^2)
 *     description: Calculates the electric force between two point charges. Returns signed force (positive for repulsion, negative for attraction).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Coulomb's constant (k)
 *               q1:
 *                 type: number
 *                 description: Charge 1 (q1)
 *               q2:
 *                 type: number
 *                 description: Charge 2 (q2)
 *               r:
 *                 type: number
 *                 description: Distance between charges (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - q1
 *               - q2
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of electric force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Electric force (F)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/coulombs-law", handleCalculationRequest(electroMagnetismController.calculateCoulombsLaw));

/**
 * @swagger
 * /physics/electric-field:
 *   post:
 *     summary: Calculates electric field from force (E = F_E/q)
 *     description: Calculates the electric field strength based on the force exerted on a test charge.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FE:
 *                 type: number
 *                 description: Electric force (F_E)
 *               q:
 *                 type: number
 *                 description: Test charge (q)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - FE
 *               - q
 *     responses:
 *       200:
 *         description: Successful calculation of electric field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Electric field (E)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, charge is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/electric-field", handleCalculationRequest(electroMagnetismController.calculateElectricField));

/**
 * @swagger
 * /physics/electric-potential:
 *   post:
 *     summary: Calculates electric potential from potential energy change (V = ΔU_E/q)
 *     description: Calculates the electric potential (voltage) based on the change in electric potential energy per unit charge. Note- Function name `calculateElectricPotential` is correct, but parameter `deltaUE` implies change, while the formula is typically V=U_E/q or ΔV=ΔU_E/q. Documenting based on the formula ΔV = ΔU_E/q and returning ΔV.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaUE:
 *                 type: number
 *                 description: Change in electric potential energy (ΔU_E)
 *               q:
 *                 type: number
 *                 description: Charge (q)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaUE
 *               - q
 *     responses:
 *       200:
 *         description: Successful calculation of electric potential change.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in electric potential (ΔV)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, charge is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/electric-potential", handleCalculationRequest(electroMagnetismController.calculateElectricPotential));

/**
 * @swagger
 * /physics/field-and-potential:
 *   post:
 *     summary: Calculates electric field from potential difference (E = ΔV/d)
 *     description: Calculates the magnitude of a uniform electric field based on the potential difference across a distance. Note- Function name "Field and Potential" is misleading; it calculates the Electric Field E.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaV:
 *                 type: number
 *                 description: Change in potential (ΔV)
 *               d:
 *                 type: number
 *                 description: Distance over which the potential changes (d)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaV
 *               - d
 *     responses:
 *       200:
 *         description: Successful calculation of electric field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Electric field (E)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/field-and-potential", handleCalculationRequest(electroMagnetismController.calculateFieldAndPotential));

/**
 * @swagger
 * /physics/capacitance:
 *   post:
 *     summary: Calculates capacitance (C = Q/V)
 *     description: Calculates capacitance based on the charge stored and the voltage across a capacitor.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Q:
 *                 type: number
 *                 description: Charge (Q)
 *               V:
 *                 type: number
 *                 description: Voltage (V)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - Q
 *               - V
 *     responses:
 *       200:
 *         description: Successful calculation of capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Capacitance (C)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, voltage is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/capacitance", handleCalculationRequest(electroMagnetismController.calculateCapacitance));

/**
 * @swagger
 * /physics/plate-capacitor:
 *   post:
 *     summary: Calculates parallel plate capacitor capacitance (C = (kε₀A)/d)
 *     description: Calculates the capacitance of a parallel plate capacitor with a dielectric. Note- Function uses k * ε₀ as a single input (`kEpsilon`).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kEpsilon:
 *                 type: number
 *                 description: Product of relative permittivity and vacuum permittivity (k * ε₀)
 *               A:
 *                 type: number
 *                 description: Area of the plates (A)
 *               d:
 *                 type: number
 *                 description: Distance between plates (d)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - kEpsilon
 *               - A
 *               - d
 *     responses:
 *       200:
 *         description: Successful calculation of capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Capacitance (C)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/plate-capacitor", handleCalculationRequest(electroMagnetismController.calculatePlateCapacitor));

/**
 * @swagger
 * /physics/cylindrical-capacitor:
 *   post:
 *     summary: Calculates cylindrical capacitor capacitance (C = (2πkε₀l) / ln(r2/r1))
 *     description: Calculates the capacitance of a cylindrical capacitor with a dielectric. Note- Function uses k * ε₀ as a single input (`kEpsilon`).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kEpsilon:
 *                 type: number
 *                 description: Product of relative permittivity and vacuum permittivity (k * ε₀)
 *               l:
 *                 type: number
 *                 description: Length of the cylinder (l)
 *               r2:
 *                 type: number
 *                 description: Outer radius (r2)
 *               r1:
 *                 type: number
 *                 description: Inner radius (r1)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - kEpsilon
 *               - l
 *               - r2
 *               - r1
 *     responses:
 *       200:
 *         description: Successful calculation of capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Capacitance (C)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, inner radius is zero, r1 >= r2).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/cylindrical-capacitor", handleCalculationRequest(electroMagnetismController.calculateCylindricalCapacitor));

/**
 * @swagger
 * /physics/spherical-capacitor:
 *   post:
 *     summary: Calculates spherical capacitor capacitance (C = 4πkε₀ / (1/r1 - 1/r2))
 *     description: Calculates the capacitance of a spherical capacitor with a dielectric. Note- Function uses k * ε₀ as a single input (`kEpsilon`).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kEpsilon:
 *                 type: number
 *                 description: Product of relative permittivity and vacuum permittivity (k * ε₀)
 *               r1:
 *                 type: number
 *                 description: Inner radius (r1)
 *               r2:
 *                 type: number
 *                 description: Outer radius (r2)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - kEpsilon
 *               - r1
 *               - r2
 *     responses:
 *       200:
 *         description: Successful calculation of capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Capacitance (C)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, inner radius is zero, r1 >= r2).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/spherical-capacitor", handleCalculationRequest(electroMagnetismController.calculateSphericalCapacitor));

/**
 * @swagger
 * /physics/capacitive-pe:
 *   post:
 *     summary: Validates capacitor potential energy equations (PE = 0.5QV = 0.5CV^2 = 0.5Q^2/C)
 *     description: Checks if the three common formulas for potential energy stored in a capacitor are equivalent for the given Q, V, and C. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Q:
 *                 type: number
 *                 description: Charge (Q)
 *               V:
 *                 type: number
 *                 description: Voltage (V)
 *               C:
 *                 type: number
 *                 description: Capacitance (C)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - Q
 *               - V
 *               - C
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
 *                   description: True if the equations hold.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, capacitance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/capacitive-pe", handleCalculationRequest(electroMagnetismController.calculateCapacitivePE));

/**
 * @swagger
 * /physics/electric-current:
 *   post:
 *     summary: Calculates electric current (I = ΔQ/Δt)
 *     description: Calculates electric current based on the amount of charge passing through a point per unit time.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaQ:
 *                 type: number
 *                 description: Change in charge (ΔQ)
 *               deltaT:
 *                 type: number
 *                 description: Time interval (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaQ
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of electric current.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Electric current (I)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, time interval is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/electric-current", handleCalculationRequest(electroMagnetismController.calculateElectricCurrent));

/**
 * @swagger
 * /physics/charge-density:
 *   post:
 *     summary: Calculates charge density (ρ = Q/V)
 *     description: Calculates the average charge density (charge per unit volume).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Q:
 *                 type: number
 *                 description: Charge (Q)
 *               V:
 *                 type: number
 *                 description: Volume (V)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - Q
 *               - V
 *     responses:
 *       200:
 *         description: Successful calculation of charge density.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Charge density (ρ)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, volume is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/charge-density", handleCalculationRequest(electroMagnetismController.calculateChargeDensity));

/**
 * @swagger
 * /physics/current-density:
 *   post:
 *     summary: Calculates current density (J = I/A)
 *     description: Calculates electric current density (current per unit cross-sectional area).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               I:
 *                 type: number
 *                 description: Electric current (I)
 *               A:
 *                 type: number
 *                 description: Cross-sectional area (A)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - I
 *               - A
 *     responses:
 *       200:
 *         description: Successful calculation of current density.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Current density (J)
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
electromagnetismRouter.post("/current-density", handleCalculationRequest(electroMagnetismController.calculateCurrentDensity));

/**
 * @swagger
 * /physics/ohms-law:
 *   post:
 *     summary: Calculates resistance using Ohm's Law (R = V/I)
 *     description: Calculates resistance based on voltage and current. Note- The function calculates Resistance R from V and I.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               V:
 *                 type: number
 *                 description: Voltage (V)
 *               I:
 *                 type: number
 *                 description: Current (I)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - V
 *               - I
 *     responses:
 *       200:
 *         description: Successful calculation of resistance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Resistance (R)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, current is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/ohms-law", handleCalculationRequest(electroMagnetismController.calculateOhmsLaw));

/**
 * @swagger
 * /physics/resistivity-conductivity:
 *   post:
 *     summary: Calculates conductivity from resistivity (σ = 1/ρ)
 *     description: Calculates conductivity (σ) from resistivity (ρ).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rhoValue:
 *                 type: number
 *                 description: Resistivity (ρ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - rhoValue
 *     responses:
 *       200:
 *         description: Successful calculation of conductivity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Conductivity (σ)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, resistivity is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/resistivity-conductivity", handleCalculationRequest(electroMagnetismController.calculateResitivityConductivity));

/**
 * @swagger
 * /physics/electric-resistance:
 *   post:
 *     summary: Calculates electric resistance (R = ρ(l/A))
 *     description: Calculates the resistance of a conductor based on its resistivity, length, and cross-sectional area. Note- Uses `rhoValue` for resistivity.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rhoValue:
 *                 type: number
 *                 description: Resistivity (ρ)
 *               l:
 *                 type: number
 *                 description: Length of conductor (l)
 *               A:
 *                 type: number
 *                 description: Cross-sectional area (A)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - rhoValue
 *               - l
 *               - A
 *     responses:
 *       200:
 *         description: Successful calculation of resistance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Resistance (R)
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
electromagnetismRouter.post("/electric-resistance", handleCalculationRequest(electroMagnetismController.calculateElectricResistance));

/**
 * @swagger
 * /physics/electric-power:
 *   post:
 *     summary: Validates electric power equations (P = VI = I^2R = V^2/R)
 *     description: Checks if the three common formulas for electric power are equivalent for the given V, I, and R. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               V:
 *                 type: number
 *                 description: Voltage (V)
 *               I:
 *                 type: number
 *                 description: Current (I)
 *               R:
 *                 type: number
 *                 description: Resistance (R)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - V
 *               - I
 *               - R
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
 *                   description: True if the power equations hold.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, resistance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/electric-power", handleCalculationRequest(electroMagnetismController.calculateElectricPower));

/**
 * @swagger
 * /physics/resistors-in-series:
 *   post:
 *     summary: Calculates total resistance for resistors in series (R_total = R1 + R2 + ...)
 *     description: Calculates the total equivalent resistance for multiple resistors connected in series.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resistances:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Array of resistances (R)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - resistances
 *     responses:
 *       200:
 *         description: Successful calculation of total resistance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Total resistance (R_total)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers in the array).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/resistors-in-series", handleCalculationRequest(electroMagnetismController.calculateResistorsInSeries));

/**
 * @swagger
 * /physics/resistors-in-parallel:
 *   post:
 *     summary: Calculates total resistance for resistors in parallel (1/R_total = 1/R1 + 1/R2 + ...)
 *     description: Calculates the total equivalent resistance for multiple resistors connected in parallel.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resistances:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Array of resistances (R)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - resistances
 *     responses:
 *       200:
 *         description: Successful calculation of total resistance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Total resistance (R_total)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers in the array, any resistance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/resistors-in-parallel", handleCalculationRequest(electroMagnetismController.calculateResistorsInParallel));

/**
 * @swagger
 * /physics/capacitors-in-series:
 *   post:
 *     summary: Calculates total capacitance for capacitors in series (1/C_total = 1/C1 + 1/C2 + ...)
 *     description: Calculates the total equivalent capacitance for multiple capacitors connected in series.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacitances:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Array of capacitances (C)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - capacitances
 *     responses:
 *       200:
 *         description: Successful calculation of total capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Total capacitance (C_total)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers in the array, any capacitance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/capacitors-in-series", handleCalculationRequest(electroMagnetismController.calculateCapacitorsInSeries));

/**
 * @swagger
 * /physics/capacitors-in-parallel:
 *   post:
 *     summary: Calculates total capacitance for capacitors in parallel (C_total = C1 + C2 + ...)
 *     description: Calculates the total equivalent capacitance for multiple capacitors connected in parallel.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacitances:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Array of capacitances (C)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - capacitances
 *     responses:
 *       200:
 *         description: Successful calculation of total capacitance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Total capacitance (C_total)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers in the array).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/capacitors-in-parallel", handleCalculationRequest(electroMagnetismController.calculateCapacitorsInParallel));

/**
 * @swagger
 * /physics/magnetic-force-charge:
 *   post:
 *     summary: Calculates magnetic force on a charged particle (F = qvB sin(θ))
 *     description: Calculates the magnitude of the magnetic force exerted on a moving charged particle. Angle should be in radians.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               q:
 *                 type: number
 *                 description: Charge of the particle (q)
 *               v:
 *                 type: number
 *                 description: Velocity of the particle (v)
 *               B:
 *                 type: number
 *                 description: Magnetic field strength (B)
 *               theta:
 *                 type: number
 *                 description: Angle between velocity and magnetic field vectors in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - q
 *               - v
 *               - B
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic force (F)
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
electromagnetismRouter.post("/magnetic-force-charge", handleCalculationRequest(electroMagnetismController.calculateMagneticForceCharge));

/**
 * @swagger
 * /physics/magnetic-force-current:
 *   post:
 *     summary: Calculates magnetic force on a current-carrying conductor (F = I l B sin(θ))
 *     description: Calculates the magnitude of the magnetic force exerted on a straight conductor carrying current in a magnetic field. Angle should be in radians.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               I:
 *                 type: number
 *                 description: Current in the conductor (I)
 *               l:
 *                 type: number
 *                 description: Length of the conductor in the field (l)
 *               B:
 *                 type: number
 *                 description: Magnetic field strength (B)
 *               theta:
 *                 type: number
 *                 description: Angle between current direction and magnetic field vector in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - I
 *               - l
 *               - B
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic force.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic force (F)
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
electromagnetismRouter.post("/magnetic-force-current", handleCalculationRequest(electroMagnetismController.calculateMagneticForceCurrent));

/**
 * @swagger
 * /physics/biot-savart-law:
 *   post:
 *     summary: Calculates magnetic field from a current element (dB = (μ₀I ds) / (4πr^2))
 *     description: Calculates the magnitude of the magnetic field contribution from a differential current element perpendicular to the radius vector. Note- The function implements `(μ₀ * I * ds) / (4 * π * r^2)`, omitting the sin(θ) term often present in the differential form, effectively assuming θ=90 degrees or calculating only the component perpendicular to the radius vector in that specific plane. Documenting the formula implemented.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mu0:
 *                 type: number
 *                 description: Permeability of free space (μ₀)
 *               I:
 *                 type: number
 *                 description: Current (I)
 *               ds:
 *                 type: number
 *                 description: Differential length element (ds)
 *               r:
 *                 type: number
 *                 description: Distance from the current element to the point (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - mu0
 *               - I
 *               - ds
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic field contribution.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic field contribution (dB)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/biot-savart-law", handleCalculationRequest(electroMagnetismController.calculateBiotSavartLaw));

/**
 * @swagger
 * /physics/solenoid:
 *   post:
 *     summary: Calculates magnetic field inside a long solenoid (B = μ₀nI)
 *     description: Calculates the magnitude of the magnetic field inside a long ideal solenoid.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mu0:
 *                 type: number
 *                 description: Permeability of free space (μ₀)
 *               n:
 *                 type: number
 *                 description: Number of turns per unit length (n)
 *               I:
 *                 type: number
 *                 description: Current in the solenoid (I)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - mu0
 *               - n
 *               - I
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic field (B)
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
electromagnetismRouter.post("/solenoid", handleCalculationRequest(electroMagnetismController.calculateSolenoid));

/**
 * @swagger
 * /physics/straight-wire:
 *   post:
 *     summary: Calculates magnetic field from an infinite straight wire (B = (μ₀I)/(2πr))
 *     description: Calculates the magnitude of the magnetic field at a distance from a long, straight conductor carrying current.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mu0:
 *                 type: number
 *                 description: Permeability of free space (μ₀)
 *               I:
 *                 type: number
 *                 description: Current in the wire (I)
 *               r:
 *                 type: number
 *                 description: Perpendicular distance from the wire (r)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - mu0
 *               - I
 *               - r
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic field (B)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/straight-wire", handleCalculationRequest(electroMagnetismController.calculateStraightWire));

/**
 * @swagger
 * /physics/parallel-wires:
 *   post:
 *     summary: Calculates force per unit length between parallel wires (F/L = (μ₀I₁I₂)/(2πd))
 *     description: Calculates the magnitude of the force per unit length between two long, parallel conductors carrying currents.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mu0:
 *                 type: number
 *                 description: Permeability of free space (μ₀)
 *               I1:
 *                 type: number
 *                 description: Current in wire 1 (I₁)
 *               I2:
 *                 type: number
 *                 description: Current in wire 2 (I₂)
 *               d:
 *                 type: number
 *                 description: Distance between wires (d)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - mu0
 *               - I1
 *               - I2
 *               - d
 *     responses:
 *       200:
 *         description: Successful calculation of force per unit length.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Force per unit length (F/L)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, distance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/parallel-wires", handleCalculationRequest(electroMagnetismController.calculateParallelWires));

/**
 * @swagger
 * /physics/electric-flux:
 *   post:
 *     summary: Calculates electric flux (Φ_E = E * A * cos(θ))
 *     description: Calculates the electric flux through a flat surface in a uniform electric field. Angle should be between the electric field vector and the area vector, in radians.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               E:
 *                 type: number
 *                 description: Electric field strength (E)
 *               A:
 *                 type: number
 *                 description: Area of the surface (A)
 *               theta:
 *                 type: number
 *                 description: Angle between E and A vectors in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - E
 *               - A
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of electric flux.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Electric flux (Φ_E)
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
electromagnetismRouter.post("/electric-flux", handleCalculationRequest(electroMagnetismController.calculateElectricFlux));

/**
 * @swagger
 * /physics/magnetic-flux:
 *   post:
 *     summary: Calculates magnetic flux (Φ_B = B * A * cos(θ))
 *     description: Calculates the magnetic flux through a flat surface in a uniform magnetic field. Angle should be between the magnetic field vector and the area vector, in radians.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               B:
 *                 type: number
 *                 description: Magnetic field strength (B)
 *               A:
 *                 type: number
 *                 description: Area of the surface (A)
 *               theta:
 *                 type: number
 *                 description: Angle between B and A vectors in radians (θ)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - B
 *               - A
 *               - theta
 *     responses:
 *       200:
 *         description: Successful calculation of magnetic flux.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Magnetic flux (Φ_B)
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
electromagnetismRouter.post("/magnetic-flux", handleCalculationRequest(electroMagnetismController.calculateMagneticFlux));

/**
 * @swagger
 * /physics/motional-emf:
 *   post:
 *     summary: Calculates motional emf (emf = Blv)
 *     description: Calculates the magnitude of the emf induced in a conductor moving perpendicular to a magnetic field. Note- The function calculates the magnitude Blv, omitting the negative sign sometimes used for direction (Lenz's Law).
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               B:
 *                 type: number
 *                 description: Magnetic field strength (B)
 *               l:
 *                 type: number
 *                 description: Length of the conductor perpendicular to velocity and field (l)
 *               v:
 *                 type: number
 *                 description: Velocity perpendicular to the field and conductor (v)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - B
 *               - l
 *               - v
 *     responses:
 *       200:
 *         description: Successful calculation of induced emf magnitude.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Induced emf magnitude (emf)
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
electromagnetismRouter.post("/motional-emf", handleCalculationRequest(electroMagnetismController.calculateMotionalEmf));

/**
 * @swagger
 * /physics/induced-emf:
 *   post:
 *     summary: Calculates induced emf from changing flux (emf = -ΔΦ_B / Δt)
 *     description: Calculates the emf induced by a changing magnetic flux according to Faraday's Law of Induction.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deltaPhiB:
 *                 type: number
 *                 description: Change in magnetic flux (ΔΦ_B)
 *               deltaT:
 *                 type: number
 *                 description: Change in time (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - deltaPhiB
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of induced emf.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Induced emf
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, time interval is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/induced-emf", handleCalculationRequest(electroMagnetismController.calculateInducedEmf));

/**
 * @swagger
 * /physics/inductance-induced-emf:
 *   post:
 *     summary: Calculates induced emf from changing current in an inductor (emf = -L * ΔI / Δt)
 *     description: Calculates the self-induced emf in an inductor due to a changing current. Note- The function is named `calculateInductance` but returns emf using this formula. Documenting what it returns.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               L:
 *                 type: number
 *                 description: Inductance (L)
 *               dI:
 *                 type: number
 *                 description: Change in current (ΔI)
 *               dt:
 *                 type: number
 *                 description: Change in time (Δt)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - L
 *               - dI
 *               - dt
 *     responses:
 *       200:
 *         description: Successful calculation of induced emf.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Induced emf
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, time interval is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/inductance-induced-emf", handleCalculationRequest(electroMagnetismController.calculateInductance));

/**
 * @swagger
 * /physics/capacitive-reactance:
 *   post:
 *     summary: Calculates capacitive reactance (X_C = 1/(2πfC))
 *     description: Calculates the opposition of a capacitor to alternating current.
 *     tags:
 *          - Physics - Electromagnetism
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
 *               C:
 *                 type: number
 *                 description: Capacitance (C)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - f
 *               - C
 *     responses:
 *       200:
 *         description: Successful calculation of capacitive reactance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Capacitive reactance (X_C)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, frequency or capacitance is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
electromagnetismRouter.post("/capacitive-reactance", handleCalculationRequest(electroMagnetismController.calculateCapacitiveReactance));

/**
 * @swagger
 * /physics/inductive-reactance:
 *   post:
 *     summary: Calculates inductive reactance (X_L = 2πfL)
 *     description: Calculates the opposition of an inductor to alternating current.
 *     tags:
 *          - Physics - Electromagnetism
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
 *               L:
 *                 type: number
 *                 description: Inductance (L)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - f
 *               - L
 *     responses:
 *       200:
 *         description: Successful calculation of inductive reactance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Inductive reactance (X_L)
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
electromagnetismRouter.post("/inductive-reactance", handleCalculationRequest(electroMagnetismController.calculateInductiveReactance));

/**
 * @swagger
 * /physics/impedance:
 *   post:
 *     summary: Calculates impedance (Z = √(R^2 + (X_L - X_C)^2))
 *     description: Calculates the total opposition to current flow in an AC circuit containing resistance, inductive reactance, and capacitive reactance.
 *     tags:
 *          - Physics - Electromagnetism
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               R:
 *                 type: number
 *                 description: Resistance (R)
 *               XL:
 *                 type: number
 *                 description: Inductive reactance (X_L)
 *               XC:
 *                 type: number
 *                 description: Capacitive reactance (X_C)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - R
 *               - XL
 *               - XC
 *     responses:
 *       200:
 *         description: Successful calculation of impedance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Impedance (Z)
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
electromagnetismRouter.post("/impedance", handleCalculationRequest(electroMagnetismController.calculateImpedance));

// Don't forget to export the router
module.exports = electromagnetismRouter;
